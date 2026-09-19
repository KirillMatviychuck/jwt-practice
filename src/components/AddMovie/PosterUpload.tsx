import { type ChangeEvent, type FC } from 'react';
import { moviesAPI } from '../../api/movieAPI';
import poster from '../../assets/gallery.png'
import cls from './PosterUpload.module.css'


type PosterUploadProps = {
    movieId: number;
    title: string;
};

export const PosterUpload: FC<PosterUploadProps> = ({
    movieId,
    title,
}) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            moviesAPI.addMoviePoster(movieId, file);
        }
    };

    return (
        <>
            <label htmlFor={`poster-upload-${movieId}`}>
                <img
                    src={poster}
                    alt={title}
                    className={cls.uploadButton}
                />
            </label>

            <input
                id={`poster-upload-${movieId}`}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
            />
        </>
    );
};