import { Link } from "react-router-dom";

export default function DepartmentList({ departments }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Departments</h2>

      {departments.length === 0 && (
        <p className="text-gray-500">No departments created yet.</p>
      )}

      {departments.map((dept) => (
        <div
          key={dept._id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <p className="font-semibold">{dept.name}</p>
            <p className="text-sm text-gray-500">
              Minister: {dept.createdBy?.name}
            </p>
          </div>

          <Link
            to={`/departments/${dept._id}`}
            className="text-blue-600 hover:underline"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
