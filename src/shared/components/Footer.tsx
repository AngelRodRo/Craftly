export default function Footer() {
  return (
    <footer className="flex justify-between items-center p-4 bg-white border-t border-gray-200 fixed bottom-0 w-full z-10">
      <div className="flex items-center gap-2 w-full justify-center">
        <p className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Craftly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
