import Link from "next/link";

export default function Header() {
  return (
   <nav
        class="flex items-center justify-between flex-wrap bg-white  lg:px-12 shadow border-solid border-t-2 border-indigo-400">
        <div class="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
            <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
                <img class="w-44" title="Code Arc" alt="Code Arc Image Logo" src='https://www.datocms-assets.com/103068/1687417296-code-arc3-1.png' />
            </div>
            
        </div>
    
        <div class="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
            <div class="text-md font-bold text-indigo-400 lg:flex-grow">
               
            </div>
            
            
            <div class="flex ">
                <a href="#"
                   class="block text-md px-4 py-2 rounded text-indigo-400 ml-2 font-bold hover:text-white mt-4 hover:bg-indigo-400 lg:mt-0">Sign
                    in</a>
    
                <a href="#"
                   class=" block text-md px-4  ml-2 py-2 rounded text-indigo-400 font-bold hover:text-white mt-4 hover:bg-indigo-400 lg:mt-0">login</a>
            </div>
        </div>
    
    </nav>
  );
}
