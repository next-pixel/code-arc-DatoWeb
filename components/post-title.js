export default function PostTitle({ children }) {
  return (
    <><h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">{children}</h1><div className="w-full mb-4">
      <div className="h-1 mx-auto bg-indigo-400 w-64  my-0 py-0 rounded-t"></div>
    </div></>
   
  );
}
