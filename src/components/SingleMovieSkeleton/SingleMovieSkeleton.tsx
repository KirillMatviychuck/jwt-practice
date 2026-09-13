import ContentLoader from 'react-content-loader';

const SingleMovieSkeleton = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={300}
        viewBox="0 0 400 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        {[...new Array(5)].map((_, index) => (
            <rect
                key={index}
                x="0"
                y={index * 30}
                width="300"
                height="20"
            />
        ))}
    </ContentLoader>
);

export default SingleMovieSkeleton;
