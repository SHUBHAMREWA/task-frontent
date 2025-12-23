import { useState, useEffect } from 'react';
import { getAllStudents, deleteStudent, updateStudent, createStudent, updateStudentProfile, changePassword } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const { user, login } = useAuth();
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Student Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'MERN Bootcamp',
  });

  // Admin Profile Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });


  useEffect(() => {
    fetchStudents();
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await deleteStudent(id);
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete student');
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      email: '',
      course: 'MERN Bootcamp',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        const updated = await updateStudent(editingStudent._id, formData);
        setStudents(students.map((s) => (s._id === editingStudent._id ? updated : s)));
      } else {
        const response = await createStudent(formData);
        if (response.student) {
            setStudents([...students, response.student]);
        }
      }
      setShowModal(false);
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // 1. Update Profile
      const updatedUser = await updateStudentProfile({
        name: profileData.name,
        email: profileData.email
      });
      
      // 2. Change Password (if provided)
      let passMsg = '';
      if (profileData.currentPassword && profileData.newPassword) {
        await changePassword({
            currentPassword: profileData.currentPassword,
            newPassword: profileData.newPassword
        });
        passMsg = ' and Password changed';
      }

      // Update local state and global auth context
      const token = localStorage.getItem('token');
      login(updatedUser, token);
      
      setShowProfileModal(false);
      
      // Clear password fields
      setProfileData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
      
      alert(`Profile updated${passMsg} successfully!`);
    } catch (err) {
      alert(err.message || 'Failed to update profile');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all students</p>
          </div>
          <button
            onClick={() => setShowProfileModal(true)}
            className="px-4 py-2 cursor-pointer bg-white text-purple-600 border border-purple-200 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 shadow-sm"
          >
            Edit My Profile
          </button>
        </div>

        {/* Add Student Button */}
        <div className="mb-6">
          <button
            onClick={handleAdd}
            className="px-6 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            + Add New Student
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Students Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Enrollment Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        No students found. Add your first student!
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student._id} className="hover:bg-purple-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            {student.course}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(student.enrollmentDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <button
                            onClick={() => handleEdit(student)}
                            className="text-indigo-600 cursor-pointer hover:text-indigo-900 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student._id)}
                            className="text-red-600 cursor-pointer hover:text-red-900 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Student Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingStudent ? 'Edit Student' : 'Add New Student'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="MERN Bootcamp"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                >
                  {editingStudent ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 cursor-pointer bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>Edit My Profile</span>
              <span className="text-xs font-normal px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Admin</span>
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
              
               <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Change Password (Optional)</h3>
                <div className="space-y-3">
                    <div>
                        <input
                        type="password"
                        placeholder="Current Password"
                        value={profileData.currentPassword || ''}
                        onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <input
                        type="password"
                        placeholder="New Password"
                        value={profileData.newPassword || ''}
                        onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">

                <button
                  type="submit"
                  className="flex-1 px-6 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 px-6 py-3 cursor-pointer bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminDashboard;
