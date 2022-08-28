import React from 'react'

function TopButtons(props) {

    const cities = [
        {
            id:1,
            title: 'mumbai'
        },
        {
            id:2,
            title: 'west bengal'
        },
        {
            id:3,
            title: 'Bhubaneswar'
        },
        {
            id:4,
            title: 'Delhi'
        },
    ]

  return (
    <div className='flex  items-center justify-around my-6'>
        
        {cities.map ((city) => (

            <button key={city.id}
            onClick={() => props.setQuery({q:city.title})} 
            className="text-lg font-medium capitalize">{city.title}</button>



        ))}

    </div>
  )
}

export default TopButtons