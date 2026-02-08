import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filerType: "Industry",
    array: ["Frontend Developer", "backend Developer", "FullStack Developer"],
  },

  {
    filerType: "Salary",
    array: ["0-40k", "42-1Lakh", "1lakh to 5Lakh"],
  },
];

export const FilterCard = () => {
  const [selectedVaule, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changehandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    // console.log(selectedVaule)
    dispatch(setSearchedQuery(selectedVaule))
  }, [selectedVaule])
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-xl text-gray-900">Filter Jobs</h1>
        {selectedVaule && (
          <button
            onClick={() => setSelectedValue('')}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      <hr className="mb-6 border-gray-200" />
      <RadioGroup onValueChange={changehandler} value={selectedVaule}>
        {
          filterData.map((data, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h1 className="font-semibold text-lg text-gray-800 mb-3">{data.filerType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className="flex items-center space-x-3 my-2 group">
                      <RadioGroupItem className="cursor-pointer text-[#6A38C2] border-gray-300 focus:ring-[#6A38C2]" value={item} id={itemId} />
                      <Label htmlFor={itemId} className="text-gray-600 group-hover:text-gray-900 cursor-pointer transition-colors text-sm">
                        {item}
                      </Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
};
