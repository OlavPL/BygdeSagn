import React from 'react'

interface IProps {
    showPost: () => void
}

export const AutoModWarningCard = ({showPost}: IProps) => {
  return (
    <div className='text-center font-semibold '>
        <h1>Dette Sagnet er skjult fordi det kan være spam og ikke ha noe med sagn å gjøre, ha sensitivt innhold eller hatsyttringer </h1>

        <button 
            onClick={showPost}
            className="mt-3 transition duration-300 active:scale-95 py-2 px-4 bg-emphasis-300 hover:bg-emphasis-500
                          shadow shadow-primary-600/25 rounded-md hover:shadow-emphasis-400/75 "
        >
            Vis innhold
        </button>
    </div>
  )
}

export default AutoModWarningCard
