import { useState } from 'react'
import './App.css'
import SearchIcon from './assets/search.png'
import Weather from './Weather'

function App() {
  const [text, setText] = useState("Thanjavur");
  const [searchQuery, setSearchQuery] = useState("Thanjavur");
  const handlecity = (e) => {
    setText(e.target.value)
  }
  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(text);
    }
  };

  const handleSearchClick = () => {
    setSearchQuery(text);
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 pt-10 md:pt-16 pb-6">
      <div className=' w-[300px] md:w-[400px]   bg-white rounded-md shadow-md'>
        <div className="relative flex items-center w-full p-4 mb-6 ">
          <input
            type="text"
            className="w-full px-2 py-1  outline-none bg-transparent  rounded-md text-center md:text-left text-lg font-medium mt-2"
            placeholder="Enter city"
            value={text}
            onChange={handlecity}
            onKeyDown={handlekeydown}
          />
          <img
            src={SearchIcon}
            onClick={handleSearchClick}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            alt="Search"
          />
        </div>

        <Weather text={searchQuery} />
      </div>
    </div>
  )
}

export default App