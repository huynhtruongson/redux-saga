import {Button} from '@mui/material';
import {Student} from 'models';
import React from 'react';
import {useForm} from 'react-hook-form';
import {InputField, RadioGroupField, SelectField} from 'components/FormFields';
import {useSelector} from 'react-redux';
import {cityOptionSelector} from 'features/city/citySlice';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
interface Props {
    initialValue: Student;
    onSubmit?: (formValues: Student) => void;
}
const schema = yup
    .object()
    .shape({
        name: yup.string().required('Name is required!'),
        age: yup
            .number()
            .positive('Age is positive number!')
            .integer('Age is integer number!')
            .min(18, 'Min is 18!')
            .max(30, 'Max is 30!')
            .required('Age is required!')
            .typeError('Please enter a number!'),
        gender: yup
            .string()
            .oneOf(['male', 'female'], 'Please select either male or female!')
            .required('Gender is required!'),
        city: yup.string().required('City is required!'),
        mark: yup
            .number()
            .min(0, 'Min is 0!')
            .max(10, 'Max is 10!')
            .required()
            .typeError('Please enter a number!'),
    })
    .required();
const StudentForm = ({initialValue, onSubmit}: Props) => {
    const cityOptions = useSelector(cityOptionSelector);
    const {control, handleSubmit} = useForm<Student>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: initialValue,
        reValidateMode: 'onSubmit',
    });
    const handleSubmitForm = async (formValues: Student) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <InputField name='name' control={control} label='Name' fullWidth={true} />
            <InputField name='age' control={control} label='Age' fullWidth={true} type='number' />
            <RadioGroupField
                name='gender'
                control={control}
                label='Gender'
                options={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'},
                ]}
            />
            {Array.isArray(cityOptions) && cityOptions.length > 0 && (
                <SelectField name='city' control={control} label='City' options={cityOptions} />
            )}
            <InputField
                name='mark'
                control={control}
                label='Mark'
                fullWidth={true}
                inputProps={{type: 'number'}}
            />
            <Button type='submit' sx={{display: 'block'}}>
                Submit
            </Button>
        </form>
    );
};

export default StudentForm;
