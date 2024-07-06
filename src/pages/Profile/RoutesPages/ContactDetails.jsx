import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { auth, db } from '../../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ContactDetails = () => {

  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);
  const [values, setValues] = useState({
    name: '',
    phone: ''
  });

  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleBlur = (field) => {
    toggleEditMode(field);
  };

  const changePassword = async () => {
    await sendPasswordResetEmail(auth, user.email)
      .then(() => {
        toast.success('Check your email');
        window.location.href = '/user-profile/check-email';
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleChanges = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", user.uid), {
        fullName: values.name,
        phone: values.phone,
      }, { merge: true });
      toast.success('Changes saved successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserData(data);
      setValues({
        name: data.fullName || '',
        phone: data.phone || ''
      });
    } else {
      window.location.href = '/shop/404';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex flex-col justify-center items-start w-full md:px-12'>
      <h2 className='text-darkGrey font-bold text-[28px] mb-5'>My Info</h2>
      <h3 className='text-darkGrey font-bold text-[22px] mb-[30px]'>Contact Details</h3>

      {/* Name */}
      <div className='w-full flex justify-between items-center'>
        <div className='w-full flex flex-col gap-2 justify-center items-start font-semibold text-lg'>
          <span className='text-[#807D7E]'>Your Name</span>
          {editMode.name ? (
            <input
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              className='text-darkGrey'
              autoFocus
            />
          ) : (
            <div className='text-darkGrey'>{values.name}</div>
          )}
        </div>
        <div
          className='text-base text-darkGrey font-semibold cursor-pointer hover:text-black'
          onClick={() => toggleEditMode('name')}
        >
          Change
        </div>
      </div>
      <div className='w-full h-[0.09px] bg-[#BEBCBD] my-[22px]'></div>

      {/* Email */}
      <div className='w-full flex justify-between items-center'>
        <div className='w-full flex flex-col gap-2 justify-center items-start font-semibold text-lg'>
          <span className='text-[#807D7E]'>Email Address</span>
          <div className='text-darkGrey'>{userData?.email}</div>
        </div>
        <div className='text-base text-darkGrey font-semibold cursor-pointer hover:text-black'>
          Change
        </div>
      </div>
      <div className='w-full h-[0.09px] bg-[#BEBCBD] my-[22px]'></div>

      {/* Phone */}
      <div className='w-full flex justify-between items-center'>
        <div className='w-full flex flex-col gap-2 justify-center items-start font-semibold text-lg'>
          <span className='text-[#807D7E]'>Phone Number</span>
          {editMode.phone ? (
            <input
              type='tel'
              name='phone'
              value={values.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              className='text-darkGrey'
              autoFocus
            />
          ) : (
            <div className='text-darkGrey'>{values.phone}</div>
          )}
        </div>
        <div
          className='text-base text-darkGrey font-semibold cursor-pointer hover:text-black'
          onClick={() => toggleEditMode('phone')}
        >
          Change
        </div>
      </div>
      <div className='w-full h-[0.09px] bg-[#BEBCBD] my-[22px]'></div>

      {/* Password */}
      <div className='w-full flex justify-between items-center'>
        <div className='w-full flex flex-col gap-2 justify-center items-start font-semibold text-lg'>
          <span className='text-[#807D7E]'>Password</span>
          <div className='text-darkGrey'>.........</div>
        </div>
        <div
          className='text-base text-darkGrey font-semibold cursor-pointer hover:text-black'
          onClick={changePassword}
        >
          Change
        </div>
      </div>
      <div className='w-full h-[0.09px] bg-[#BEBCBD] my-[22px]'></div>
      <button onClick={handleChanges} className="btn bg-aztecPurple text-white px-8 hover:bg-purple-800 hover:text-white">Save Changes</button>
    </div>
  );
};

export default ContactDetails;
