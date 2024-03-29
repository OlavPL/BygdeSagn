
import { Tag } from '@/types/tag'
import React, { useEffect, useState } from 'react'
import TagsDropBox from './tagsDropBox'

// Interaktiv visning av tags i en boks

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    className?: string
    tagList: string[]
    removeTag: (value: string) => void
}

 const SelectedTagsBox = ({className, removeTag, tagList}: Props) => {

  return (
    <div className={`${className} ${"flex flex-wrap justify-center sm:justify-start"}`}>
      {tagList.map((tag, index) =>{
        return (
          <div key={tag+index} className={""}>
            <p onClick={(e:any) => removeTag(tag)} className="bg-emphasis-400 rounded text-justify px-1 font-semibold mb-2 ml-2">{tag}</p>
          </div>
        )
      })}
  </div>
  )
}

export default SelectedTagsBox