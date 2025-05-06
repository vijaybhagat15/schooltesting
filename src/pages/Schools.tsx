import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchoolDetails } from "../redux/slices/schoolSlice";
import { AppDispatch, RootState } from "../redux/store";
import { fetchStyleData } from "../redux/slices/styleSlice";
import { fetchHeader } from "../redux/slices/headerSlice";

const Schools = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { school, loading, error } = useSelector((state: RootState) => state.school);


  useEffect(() => {
    dispatch(fetchSchoolDetails("68093bd5b930796b48509591"));
    dispatch(fetchStyleData());
    dispatch(fetchHeader());

  }, [dispatch]);
  if (loading) return <p>Loading school data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!school) return null;
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-blue-900">{school.schoolName}</h1>
      <p><strong>Type:</strong> {school.schoolType}</p>
      <p><strong>Affiliation:</strong> {school.affiliation}</p>
      <p><strong>Year Established:</strong> {new Date(school.year).toDateString()}</p>
      <p><strong>Email:</strong> {school.email}</p>
      <p><strong>Phone:</strong> {school.phone}</p>
      <p><strong>Alternate Phone:</strong> {school.alternatePhone}</p>
      <p><strong>Website:</strong> <a href={school.schoolurl} className="text-blue-500" target="_blank" rel="noreferrer">{school.schoolurl}</a></p>
      <p><strong>Address:</strong> {school.street}, {school.location}, {school.state} - {school.zipcode}, {school.country}</p>
      <p><strong>Principal Name:</strong> {school.principalName}</p>
      <p><strong>Principal Email:</strong> {school.principalEmail}</p>
      <p><strong>Principal Phone:</strong> {school.principalPhone}</p>
      <p><strong>LinkedIn Profile:</strong> <a href={school.linkedinProfile} className="text-blue-500" target="_blank" rel="noreferrer">{school.linkedinProfile}</a></p>
      <p><strong>Description:</strong></p>
      <p className="whitespace-pre-line">{school.description}</p>
      <p><strong>Total Students:</strong> {school.totalStudents}</p>
      <p><strong>Total Faculty:</strong> {school.totalFaculty}</p>
      <p><strong>Student-Faculty Ratio:</strong> {school.ratio}:1</p>
      <p><strong>Created At:</strong> {new Date(school.createdAt).toLocaleString()}</p>
      <p><strong>Last Updated:</strong> {new Date(school.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default Schools;
