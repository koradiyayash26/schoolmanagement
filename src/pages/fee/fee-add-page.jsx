import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const years = [
  { _id: "2024", name: "2024" },
  { _id: "2023", name: "2023" },
  { _id: "2022", name: "2022" },
  { _id: "2021", name: "2021" },
  { _id: "2020", name: "2020" },
  { _id: "2019", name: "2019" },
  { _id: "2018", name: "2018" },
  { _id: "2017", name: "2017" },
  { _id: "2016", name: "2016" },
  { _id: "2015", name: "2015" },
  { _id: "2014", name: "2014" },
  { _id: "2013", name: "2013" },
  { _id: "2012", name: "2012" },
  { _id: "2011", name: "2011" },
  { _id: "2010", name: "2010" },
  { _id: "2009", name: "2009" },
  { _id: "2008", name: "2008" },
  { _id: "2007", name: "2007" },
  { _id: "2006", name: "2006" },
  { _id: "2005", name: "2005" },
  { _id: "2004", name: "2004" },
  { _id: "2003", name: "2003" },
  { _id: "2002", name: "2002" },
  { _id: "2001", name: "2001" },
  { _id: "2000", name: "2000" },
];

const FeeTypesAddPage = () => {
  const formSchema = z.object({
    amount: z.coerce.number().min(1, { message: "Enter Amount" }),
    year: z.string().min(1, { message: "Please select a year" }),
    fee_master: z.string().min(1, { message: "Please select a fee type" }),
    standard: z.string().min(1, { message: "Please select a stadnard" }),
  });

  const defaultValues = {
    year: "",
    fee_master: "",
    standard: "",
    amount: "",
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [feeMaster, setFeeMaster] = useState([]);
  const [standard, setStandard] = useState([]);

  const getFeeTypeAddDetails = () => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    return axios
      .get("http://127.0.0.1:8000/fee-types/add-search/", config)
      .then(function (response) {
        setFeeMaster(response.data.data.fee_master);
        setStandard(response.data.data.standard);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getFeeTypeAddDetails();
  }, []);

  const onSubmit = (data) => {
    let feeId;
    feeMaster.forEach((element) => {
      if (element.name === data.fee_master) {
        feeId = element.id;
      }
    });
    const formattedData = {
      ...data,
      fee_master: feeId,
    };

    const token = localStorage.getItem("Token");

    axios
      .post("http://127.0.0.1:8000/fee-types/add/", formattedData, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        navigate("/fee-type");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    onSubmit,
  });

  return (
    <>
      <h1>ADD FEE TYPE</h1>
      <Card className="">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onReset={form.reset}
              className="space-y-2 w-full"
            >
              <CardHeader>
                <CardTitle>ADD FEE TYPE</CardTitle>
                <CardDescription>
                  All Fields Are Required in This Form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                    className=""
                    control={form.control}
                    name="fee_master"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Type*</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select Fee Type"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {feeMaster.map((fee) => (
                              <SelectItem key={fee.id} value={fee.name}>
                                {fee.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    className=""
                    control={form.control}
                    name="standard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Standard*</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select Standard"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {standard.map((std) => (
                              <SelectItem key={std.id} value={std.name}>
                                {std.name == 13 ? "Balvatika" : std.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    className=""
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year*</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select a Year"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year._id} value={year._id}>
                                {year.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    className=""
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount*</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter Amount"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-4">
                <Button type="submit">Save</Button>
              </CardFooter>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default FeeTypesAddPage;
