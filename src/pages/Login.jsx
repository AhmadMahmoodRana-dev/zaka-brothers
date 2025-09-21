// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../context/Context";
// import axios from "axios";
// import validationSchema from "../schema/Login.schema";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import LoginImage from "../assets/logo.png";

// const Login = () => {
//   const { getUser } = useContext(Context);
//   const initialValues = {
//     userName: "",
//     password: "",
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (values) => {
//     try {
//       const { data } = await axios.post(
//         "https://zbl.erprz.com/zbl/login",
//         {
//           username: values.userName,
//           password: values.password,
//         }
//       );
//       console.log("Success");
//       if (data.success) {
//         localStorage.setItem("userData", JSON.stringify(data));
//         getUser();
//         navigate("/");
//       }
//     } catch (error) {
//       console.log("Login Error:", error);
//     }
//   };
//   return (
//     <div className="w-full h-screen flex flex-col justify-center items-center bg-[#ededed]">
//       <div className="w-[40%] min-w-[320px] h-[50%] shadow-2xl flex rounded-2xl">
//         <div className="w-[45%] h-full bg-white flex justify-center items-end">
//           <img
//             className="w-[80%] h-[80%] mx-auto mb-12"
//             src={LoginImage}
//             alt="Login"
//           />
//         </div>
//         <div className="form bg-white w-[55%] h-full px-4 flex flex-col justify-center">
//           <h1 className="text-black font-bold mb-5 xl:text-3xl md:text-xl text-lg italic text-center">
//             Login Your Account
//           </h1>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-6">
//                 {/* Email Field */}
//                 <div>
//                   <label
//                     htmlFor="username"
//                     className="block text-sm/6 font-medium text-gray-900"
//                   >
//                     Username
//                   </label>
//                   <div className="mt-2">
//                     <Field
//                       id="userName"
//                       name="userName"
//                       type="userName"
//                       autoComplete="userName"
//                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                     />
//                     <ErrorMessage
//                       name="userName"
//                       component="p"
//                       className="mt-1 text-sm text-red-600"
//                     />
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <label
//                       htmlFor="password"
//                       className="block text-sm/6 font-medium text-gray-900"
//                     >
//                       Password
//                     </label>
//                     <div className="text-sm">
//                       <a
//                         href="#"
//                         className="font-semibold text-indigo-600 hover:text-indigo-500 lg:text-[1vw] text-[7px]"
//                       >
//                         Forgot password?
//                       </a>
//                     </div>
//                   </div>
//                   <div className="mt-2">
//                     <Field
//                       id="password"
//                       name="password"
//                       type="password"
//                       autoComplete="current-password"
//                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                     />
//                     <ErrorMessage
//                       name="password"
//                       component="p"
//                       className="mt-1 text-sm text-red-600"
//                     />
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
//                   >
//                     {isSubmitting ? "Signing in..." : "Sign in"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../context/Context";
// import axios from "axios";
// import validationSchema from "../schema/Login.schema";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { 
//   FaUser, 
//   FaLock, 
//   FaBuilding, 
//   FaCodeBranch, 
//   FaStore,
//   FaEye,
//   FaEyeSlash
// } from "react-icons/fa";
// import { HiShieldCheck } from "react-icons/hi";
// import LoginImage from "../assets/logo.png";

// const Login = () => {
//   const { getUser } = useContext(Context);
//   const [showPassword, setShowPassword] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [stores, setStores] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const initialValues = {
//     userName: "",
//     password: "",
//     company: "",
//     branch: "",
//     store: ""
//   };

//   const navigate = useNavigate();

//   // Fetch companies, branches, and stores on component mount
//   useEffect(() => {
//     fetchPreDefineData();
//   }, []);

//   const fetchPreDefineData = async () => {
//     try {
//       const response = await axios.get("https://zbl.erprz.com/zbl/pre-define");
//       const data = response.data;
      
//       if (data.company_list) {
//         setCompanies(data.company_list);
//       }
      
//       if (data.branch_list) {
//         setBranches(data.branch_list);
//       }
      
//       // If stores are available in the response, set them too
//       if (data.store_list) {
//         setStores(data.store_list);
//       }

//   // If user list is available in the response, set them too
//       if (data.user_list) {
//         setUsers(data.user_list);
//       }

//     } catch (error) {
//       console.error("Error fetching pre-define data:", error);
//     }
//   };

//   const filterBranchesByCompany = (companyId) => {
//     if (!companyId) return [];
//     return branches.filter(branch => branch.COMPANY_ID === companyId);
//   };

//   const filterStoresByBranch = (branchId) => {
//     if (!branchId) return [];
//     return stores.filter(store => store.BRANCH_ID === branchId);
//   };

//   const handleSubmit = async (values) => {
//     setIsLoading(true);
//     try {
//       const { data } = await axios.post(
//         "https://zbl.erprz.com/zbl/login",
//         {
//           username: values.userName,
//           password: values.password,
//           company: values.company,
//           branch: values.branch,
//           store: values.store
//         }
//       );
      
//       if (data.success) {
//         // Store user data
//         localStorage.setItem("userData", JSON.stringify(data));
//         localStorage.setItem("user", JSON.stringify(data.data.user));
//         localStorage.setItem("company_list", JSON.stringify(data.data.companies));
//         localStorage.setItem("branch_list", JSON.stringify(data.data.branches));
//         localStorage.setItem("store_list", JSON.stringify(data.data.stores));
//         localStorage.setItem("cost_center_list", JSON.stringify(data.data.cost_centers));

//         localStorage.setItem("selectedCompany", values.company);
//         localStorage.setItem("selectedBranch", values.branch);
//         localStorage.setItem("selectedStore", values.store);

//         getUser();

//         console.log(values.company, values.branch, values.store);

//         navigate("/", {
//           state: {
//             companyId: values.company,
//             branchId: values.branch,
//             storeId: values.store
//           }
//         });
      
//       } else {
//         alert(data.message || "Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.log("Login Error:", error);
//       if (error.response) {
//         console.log("Error response:", error.response.data);
//         alert(error.response.data.message || "Login failed. Please check your credentials and try again.");
//       } else {
//         alert("Login failed. Please check your credentials and try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
//         {/* Left Side - Branding */}
//         <div className="w-full md:w-2/5 bg-gradient-to-br from-indigo-600 to-blue-800 text-white p-8 flex flex-col justify-between">
//           <div>
//             <div className="flex items-center justify-center mb-8">
//               <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg">
//                 <img
//                   className="w-[70%] h-[70%] object-contain"
//                   src={LoginImage}
//                   alt="Zaka Brothers Logo"
//                 />
//               </div>
//             </div>
            
//             <h1 className="text-2xl font-bold text-center mb-4">ZAKA BROTHERS</h1>
//             <p className="text-blue-100 text-center text-sm mb-8">
//               Enterprise Resource Planning System
//             </p>
            
//             <div className="space-y-3">
//               <div className="flex items-center">
//                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <HiShieldCheck className="text-white text-xs" />
//                 </div>
//                 <span className="text-sm">Secure Authentication</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <HiShieldCheck className="text-white text-xs" />
//                 </div>
//                 <span className="text-sm">Real-time Data Sync</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <HiShieldCheck className="text-white text-xs" />
//                 </div>
//                 <span className="text-sm">Multi-branch Support</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="text-center text-blue-200 text-xs">
//             © 2024 Zaka Brothers. All rights reserved.
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="w-full md:w-3/5 p-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
//             <p className="text-gray-600">Sign in to your account</p>
//           </div>

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting, values, setFieldValue }) => (
//               <Form className="space-y-4">


//                <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <FaBuilding className="mr-2 text-gray-500" />
//                     User 
//                   </label>
//                   <Field
//                     as="select"
//                     name="user"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     onChange={(e) => {
//                       setFieldValue("user", e.target.value);
//                       setFieldValue("branch", "");
//                       setFieldValue("store", "");
//                     }}
//                   >
//                     <option value="">Select User</option>
//                     {users.map((user) => (
//                       <option key={user.USER_ID} value={user.USER_ID}>
//                         {user.USER_NAME}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="user"
//                     component="p"
//                     className="mt-1 text-sm text-red-600"
//                   />
//                 </div>


//                 {/* Company Dropdown */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <FaBuilding className="mr-2 text-gray-500" />
//                     Company
//                   </label>
//                   <Field
//                     as="select"
//                     name="company"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     onChange={(e) => {
//                       setFieldValue("company", e.target.value);
//                       setFieldValue("branch", "");
//                       setFieldValue("store", "");
//                     }}
//                   >
//                     <option value="">Select Company</option>
//                     {companies.map((company) => (
//                       <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                         {company.COMPANY_NAME}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="company"
//                     component="p"
//                     className="mt-1 text-sm text-red-600"
//                   />
//                 </div>

//                 {/* Branch Dropdown */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <FaCodeBranch className="mr-2 text-gray-500" />
//                     Branch
//                   </label>
//                   <Field
//                     as="select"
//                     name="branch"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     disabled={!values.company}
//                     onChange={(e) => {
//                       setFieldValue("branch", e.target.value);
//                       setFieldValue("store", "");
//                     }}
//                   >
//                     <option value="">Select Branch</option>
//                     {filterBranchesByCompany(values.company).map((branch) => (
//                       <option key={branch.BRANCH_ID} value={branch.BRANCH_ID}>
//                         {branch.BRANCH_NAME}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="branch"
//                     component="p"
//                     className="mt-1 text-sm text-red-600"
//                   />
//                 </div>

//                 {/* Store Dropdown */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <FaStore className="mr-2 text-gray-500" />
//                     Store
//                   </label>
//                   <Field
//                     as="select"
//                     name="store"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     disabled={!values.branch || stores.length === 0}
//                   >
//                     <option value="">Select Store</option>
//                     {filterStoresByBranch(values.branch).map((store) => (
//                       <option key={store.STORE_ID} value={store.STORE_ID}>
//                         {store.STORE_NAME}
//                       </option>
//                     ))}
//                   </Field>
//                   <ErrorMessage
//                     name="store"
//                     component="p"
//                     className="mt-1 text-sm text-red-600"
//                   />
//                 </div>

//                 {/* Username Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <FaUser className="mr-2 text-gray-500" />
//                     Username
//                   </label>
//                   <Field
//                     name="userName"
//                     type="text"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     placeholder="Enter your username"
//                   />
//                   <ErrorMessage
//                     name="userName"
//                     component="p"
//                     className="mt-1 text-sm text-red-600"
//                   />
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     <FaLock className="mr-2 text-gray-500" />
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Field
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                       placeholder="Enter your password"
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                   <ErrorMessage
//                     name="password"
//                     component="p"
//                     className="mt-1 text-sm text-red-600"
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || isLoading}
//                   className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200 disabled:opacity-50 disabled: cursor-not-allowed flex items-center justify-center"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Signing in...
//                     </>
//                   ) : (
//                     "Sign in"
//                   )}
//                 </button>

//                 {/* Forgot Password */}
//                 <div className="text-center">
//                   <a
//                     href="#"
//                     className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "axios";
import validationSchema from "../schema/Login.schema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { 
  FaUser, 
  FaLock, 
  FaBuilding, 
  FaCodeBranch, 
  FaStore,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle
} from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi";
import LoginImage from "../assets/logo.png";

const Login = () => {
  const { getUser } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    userId: "",
    userName: "",
    password: "",
    company: "",
    branch: "",
    store: ""
  };

  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://zbl.erprz.com/zbl/pre-define");
      const data = response.data;
      
      if (data.user_list) {
        setUsers(data.user_list);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("Failed to load users. Please refresh the page.");
    }
  };

  const fetchCompaniesByUser = async (userId) => {
    try {
      const response = await axios.get(`https://zbl.erprz.com/zbl/pre-define?user_id=${userId}`);
      const data = response.data;
      
      if (data.company_list) {
        setCompanies(data.company_list);
      }
      
      if (data.branch_list) {
        setBranches(data.branch_list);
      }
      
      if (data.store_list) {
        setStores(data.store_list);
      }
    } catch (error) {
      console.error("Error fetching companies by user:", error);
      setErrorMessage("Failed to load company data.");
    }
  };

  const filterBranchesByCompany = (companyId) => {
    if (!companyId) return [];
    return branches.filter(branch => branch.COMPANY_ID === companyId);
  };

  const filterStoresByBranch = (branchId) => {
    if (!branchId) return [];
    return stores.filter(store => store.BRANCH_ID === branchId);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage(""); // Clear any previous errors
    
    console.log("Submitting with values:", values);

    try {
      const { data } = await axios.post(
        "https://zbl.erprz.com/zbl/login",
        {
          username: values.userName,
          password: values.password,
          company: values.company,
          branch: values.branch,
          store: values.store
        }
      );
      
      if (data.success) {
        // Store user data
        localStorage.setItem("userData", JSON.stringify(data));
      //  localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("company_list", JSON.stringify(data.data.companies));
        localStorage.setItem("branch_list", JSON.stringify(data.data.branches));
        localStorage.setItem("store_list", JSON.stringify(data.data.stores));
        localStorage.setItem("cost_center_list", JSON.stringify(data.data.cost_centers));

        localStorage.setItem("selectedCompany", values.company);
        localStorage.setItem("selectedBranch", values.branch);
        localStorage.setItem("selectedStore", values.store);

        getUser();
        navigate("/");
      
      } else {
        setErrorMessage(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Login Error:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed. Please check your credentials and try again.");
      } else {
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Branding */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-indigo-600 to-blue-800 text-white p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img
                  className="w-[70%] h-[70%] object-contain"
                  src={LoginImage}
                  alt="Zaka Brothers Logo"
                />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-4">ZAKA BROTHERS</h1>
            <p className="text-blue-100 text-center text-sm mb-8">
              Enterprise Resource Planning System
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <HiShieldCheck className="text-white text-xs" />
                </div>
                <span className="text-sm">Secure Authentication</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <HiShieldCheck className="text-white text-xs" />
                </div>
                <span className="text-sm">Real-time Data Sync</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <HiShieldCheck className="text-white text-xs" />
                </div>
                <span className="text-sm">Multi-branch Support</span>
              </div>
            </div>
          </div>
          
          <div className="text-center text-blue-200 text-xs">
            © 2024 Zaka Brothers. All rights reserved.
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-3/5 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-3 flex-shrink-0" />
              <span className="text-red-700">{errorMessage}</span>
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue, errors, touched }) => (
              <Form className="space-y-4">
                {/* User Dropdown - Properly integrated with Formik */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaUser className="mr-2 text-gray-500" />
                    Select User *
                  </label>
                  <Field
                    as="select"
                    name="userId"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                      errors.userId && touched.userId ? "border-red-300" : "border-gray-300"
                    }`}
                    onChange={(e) => {
                      const userId = e.target.value;
                      setFieldValue("userId", userId);
                      
                      // Find the selected user to get the username
                      const selectedUser = users.find(user => user.USER_ID == userId);
                      if (selectedUser) {
                        setFieldValue("userName", selectedUser.USER_NAME);
                      }
                      
                      // Reset other fields
                      setFieldValue("company", "");
                      setFieldValue("branch", "");
                      setFieldValue("store", "");
                      
                      // Fetch companies based on selected user
                      if (userId) {
                        fetchCompaniesByUser(userId);
                      } else {
                        // Clear companies if no user is selected
                        setCompanies([]);
                        setBranches([]);
                        setStores([]);
                      }
                    }}
                    required
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.USER_ID} value={user.USER_ID}>
                        {user.USER_NAME}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="userId"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Company Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaBuilding className="mr-2 text-gray-500" />
                    Company *
                  </label>
                  <Field
                    as="select"
                    name="company"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                      errors.company && touched.company ? "border-red-300" : "border-gray-300"
                    }`}
                    disabled={!values.userId}
                    required
                  >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                        {company.COMPANY_NAME}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="company"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Branch Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaCodeBranch className="mr-2 text-gray-500" />
                    Branch
                  </label>
                  <Field
                    as="select"
                    name="branch"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    disabled={!values.company}
                  >
                    <option value="">Select Branch</option>
                    {filterBranchesByCompany(values.company).map((branch) => (
                      <option key={branch.BRANCH_ID} value={branch.BRANCH_ID}>
                        {branch.BRANCH_NAME}
                      </option>
                    ))}
                  </Field>
                </div>

                {/* Store Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaStore className="mr-2 text-gray-500" />
                    Store
                  </label>
                  <Field
                    as="select"
                    name="store"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    disabled={!values.branch || stores.length === 0}
                  >
                    <option value="">Select Store</option>
                    {filterStoresByBranch(values.branch).map((store) => (
                      <option key={store.STORE_ID} value={store.STORE_ID}>
                        {store.STORE_NAME}
                      </option>
                    ))}
                  </Field>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaLock className="mr-2 text-gray-500" />
                    Password *
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                        errors.password && touched.password ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !values.userId || !values.company || !values.password}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>

                {/* Forgot Password */}
                <div className="text-center pt-4">
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Forgot your password?
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;