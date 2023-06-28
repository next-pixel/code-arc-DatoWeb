import Container from "./container";

export default function Footer() {
  return (
    
<footer className="bg-white rounded-lg shadow m-4 ">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center ">© 2023 <a href="/" title="Code Arc" className="hover:underline">Code Arc™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
        <li>
            <a href="#" title="About" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" title="Privacy Policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" title="Website Disclaimer" className="mr-4 hover:underline md:mr-6">Website Disclaimer</a>
        </li>
        <li>
            <a href="#" title="Contact" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

  );
}
