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

  const { singleCompany } = useSelector((state) => state.company);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useGetCompanyById(params.id);
  const changeventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changefileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        toast.error("File size must be less than 1MB");
        return;
      }
      setInput({ ...input, file });
    }
  };
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
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.logo || null
    })
  }, [singleCompany]);
  return (
    <div className='min-h-screen pt-20 px-4 flex justify-center'>
      <div className='max-w-2xl w-full'>
        <form onSubmit={submitHandler} className="bg-white dark:bg-[#1A1A1A] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">

          <div className='flex items-center gap-4 mb-8'>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className='rounded-full w-10 h-10 p-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600 dark:text-gray-300' />
            </Button>
            <h1 className='font-bold text-2xl text-gray-900 dark:text-white'>Company Setup</h1>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium h-fit">Company Name</Label>
              <Input
                type='text'
                name='name'
                value={input.name}
                onChange={changeventHandler}
                className="rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all"
                placeholder="e.g. Google, Microsoft"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium h-fit">Description</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeventHandler}
                className="rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all"
                placeholder="Brief description..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium h-fit">Website</Label>
              <Input
                type='text'
                name='website'
                value={input.website}
                onChange={changeventHandler}
                className="rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium h-fit">Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                onChange={changeventHandler}
                className="rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium h-fit">Company Logo</Label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex items-center justify-center bg-gray-50 dark:bg-black/20 hover:bg-gray-100 dark:hover:bg-black/40 transition-colors cursor-pointer relative">
                <Input
                  type='file'
                  accept='image/*'
                  onChange={changefileHandler}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 1MB)</p>
                </div>
              </div>
              {/* Preview could be added here if needed, but not requested explicitly */}
            </div>

          </div>

          <div className="mt-8">
            {
              loading ?
                <Button disabled className='w-full h-11 rounded-xl bg-[#6A38C2]/70 text-white'>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait
                </Button>
                :
                <Button type="submit" className='w-full h-11 rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 font-semibold text-lg'>
                  Update Company
                </Button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}
