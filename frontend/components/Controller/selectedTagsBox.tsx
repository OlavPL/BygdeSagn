
import React from 'react'

interface Props{
    className: string

    addTag: () => void
}

export const SelectedTagsBox = ({className}: Props) => {
  return (
    <div className={`${className}`}>
        selectedTagsBox
    </div>
  )
}

export default SelectedTagsBox