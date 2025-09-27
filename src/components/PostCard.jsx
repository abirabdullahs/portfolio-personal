export default function PostCard({ post }) {
  return (
    <div className="bg-white/30 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      {/* Thumbnail */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
          {post.desc}
        </p>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 rounded-full">
            {post.category}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {post.date}
          </span>
        </div>
      </div>
    </div>
  );
}
