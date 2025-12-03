export default function Profile() {
  return (
    <div className="w-full max-w-xl mx-auto card fade-in">

      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-24 h-24 text-4xl text-white rounded-full shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600">
          A
        </div>

        <div>
          <h2 className="text-2xl font-bold">Ayush Agrawal</h2>
          <p className="text-gray-600 dark:text-gray-300">Student • D.Y Patil User</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p><strong>Email:</strong> ayush@example.com</p>
        <p><strong>Mobile:</strong> 0000000000</p>
        <p><strong>Organization:</strong> D.Y Patil</p>

        <button className="w-full mt-3 btn-primary">Edit Profile</button>
      </div>

    </div>
  );
}
