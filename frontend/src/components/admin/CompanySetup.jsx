import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'


export const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });

  const {singleCompany} = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useGetCompanyById(params.id);
  const changeventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changefileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setInput({
      name:singleCompany?.name || "",
      description:singleCompany?.description || "",
      website:singleCompany?.website || "",
      location:singleCompany?.location || "",
      file:singleCompany?.logo || null
    })
  }, [singleCompany]);
  return (
    <div className='max-w-xl mx-auto my-10'>
      <form onSubmit={submitHandler}>
        <div className='flex items-center gap-5 p-8'>
          <Button onClick={() => navigate("/admin/companies")} className='border border-gray-400'>
            <ArrowLeft className='flex items-center gap-2 text-gray-500 font-semibold ' />
            <span>Back</span>
          </Button>
          <h1 className='font-bold text-xl'>Company Setup</h1>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label>Company Name</Label>
            <Input type='text' name='name' value={input.name} onChange={changeventHandler} />
          </div>

          <div>
            <Label>Description</Label>
            <Input type='text' name='description' value={input.description} onChange={changeventHandler} />
          </div>

          <div>
            <Label>Website</Label>
            <Input type='text' name='website' value={input.website} onChange={changeventHandler} />
          </div>

          <div>
            <Label>Location</Label>
            <Input type='text' name='location' value={input.location} onChange={changeventHandler} />
          </div>

          <div>
            <Label>Logo</Label>
            <Input type='file' accept='image/*' onChange={changefileHandler} />
          </div>

        </div>
        {
          loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait</Button> : <Button className='w-full my-4'>Update</Button>
        }
      </form>

    </div>
  )
}
