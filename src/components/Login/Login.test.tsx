import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Login } from './Login'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { authAPI } from '../../api/authAPI'
import { AxiosHeaders } from 'axios'
import { setTokens } from '../../api/tokenStorage'


vi.mock('../../api/authAPI', () => ({
  authAPI: {
    login: vi.fn(),
  },
}))

vi.mock('../../api/tokenStorage', () => ({
  setTokens: vi.fn(),
}))

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockAxiosResponse = <T,>(data: T) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {
    headers: new AxiosHeaders(),
  },
})

test('renders login form', async () => {

  render(<MemoryRouter>
    <Login />
  </MemoryRouter>)

  const form = screen.getByRole('form', { name: /login form/i })
  const button = screen.getByRole('button', { name: /log in/i })

  await userEvent.click(button)

  const emailErrorField = screen.getByText('Email is required')
  const passwordErrorField = screen.getByText('Enter your password')

  expect(button).toBeInTheDocument()
  expect(form).toBeInTheDocument()
  expect(emailErrorField).toBeInTheDocument()
  expect(passwordErrorField).toBeInTheDocument()
})

test('user can login successfully', async () => {

  vi.mocked(authAPI.login).mockResolvedValue(
    mockAxiosResponse({
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    })
  )

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )


  const emailInput = screen.getByLabelText('Email')
  const passwordInput = screen.getByLabelText('Password')

  const button = screen.getByRole('button', {
    name: /log in/i
  })

  await userEvent.type(emailInput, 'test@test.com')
  await userEvent.type(passwordInput, '123456')
  await userEvent.click(button)


  expect(authAPI.login)
    .toHaveBeenCalledWith(
      'test@test.com',
      '123456'
    )
  expect(authAPI.login).toHaveBeenCalledTimes(1)
  expect(mockNavigate).toHaveBeenCalledWith('/movie')
  expect(setTokens).toHaveBeenCalledWith(
    'test-access-token',
    'test-refresh-token'
  )
})