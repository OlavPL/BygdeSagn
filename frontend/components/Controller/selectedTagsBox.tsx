
import { Tag } from '@/types/tag'
import React, { useEffect, useState } from 'react'
import TagsDropBox from '../tagsDropBox'

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    className?: string
    tagList: string[]
    removeTag: (value: string) => void
}

 const SelectedTagsBox = ({className, removeTag, tagList}: Props) => {

  return (
    <div className={`${className} ${"flex flex-row space-x-2"}`}>
      {tagList.map((tag, index) =>{
        return (
          <div key={tag+index} className={""}>
            <p onClick={(e:any) => removeTag(tag)} className="bg-secondary-300 rounded text-justify px-1">{tag}</p>
          </div>
        )
      })}
  </div>
  )
}

export default SelectedTagsBox