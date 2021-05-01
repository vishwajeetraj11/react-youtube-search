import React from 'react'

const Video = ({video}) => {
    return (
        <a
        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
        target='_blank'
        rel='noreferrer'
        key={video.etag}
        className='video'
    >
        <div className='thumb-div'>
            <div className='thumb-cont'>
                <img
                    className='thumb'
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                />
            </div>
        </div>
        <div className='detail'>
            <h3
                className='video-title'
                dangerouslySetInnerHTML={{
                    __html: video.snippet.title,
                }}
            ></h3>
            <p
                className='video-description'
                dangerouslySetInnerHTML={{
                    __html: video.snippet.description,
                }}
            ></p>
            <p className='video-published'>
                Published :{' '}
                {new Date(
                    video.snippet.publishedAt
                ).toDateString()}
            </p>
        </div>
    </a>
    )
}

export default Video
