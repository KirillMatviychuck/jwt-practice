import type { FC } from "react"
import cls from './Pagination.module.css'

export const Pagination: FC<PaginationProps> = ({ changePageSetter, totalPages, currentPage }) => {
    const changePageHandler = (page: number) => changePageSetter(page)

    const pages = totalPages
    return (
        <div className={cls.pagesWrapper}>
            {[...new Array(pages)].map((_, index) => (
                <button className={currentPage === index + 1 ? cls.activePage : cls.btn}
                    key={index}
                    onClick={() => changePageHandler(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}


interface PaginationProps {
    changePageSetter: (page: number) => void;
    totalPages: number;
    currentPage: number
}