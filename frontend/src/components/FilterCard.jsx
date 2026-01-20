import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

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
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 text-gray-400" />
      <RadioGroup>
        {
            filterData.map((data, index)=> (
                <div>
                    <h1 className="font-bold text-lg">{data.filerType}</h1>
                    {
                        data.array.map((item,index )=>{
                            return(
                                <div className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem  className="cursor-pointer" value={item}/>
                                    <Label>
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
