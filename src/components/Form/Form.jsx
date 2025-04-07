import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { Btn } from '../../components/Btn/Btn.jsx';
import s from './Form.module.css';

export const Form = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const validateSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    date: Yup.string().nullable(),
    comment: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      name: '',
      email: '',
      date: null,
      comment: '',
    },
  });

  const handleDateChange = date => {
    setSelectedDate(date);
    setValue('date', date);
  };

  const handleBookingFormSubmit = () => {
    toast.success('You have booked the car successfully!');
    setSelectedDate(null);
    setValue('date', null);
    reset();
  };

  const isToday = date => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getDayClassName = date => {
    let className = s.day;
    if (isToday(date)) {
      className = `${className} ${s.today}`;
    }
    return className;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleBookingFormSubmit)} className={s.form}>
        <h3>Book your car now</h3>
        <p>Stay connected! We are always ready to help you.</p>
        <div className={s.inputs}>
          <input
            className={s.inputs}
            type="text"
            {...register('name')}
            placeholder="Name*"
            autoComplete="off"
          />
          {errors.name && (
            <span className={s.error_name}>{errors.name.message}</span>
          )}
          <input
            className={s.input}
            type="email"
            {...register('email')}
            placeholder="Email*"
            autoComplete="off"
          />
          {errors.email && (
            <span className={s.error_mail}>{errors.email.message}</span>
          )}
          <DatePicker
            className={s.calendar}
            calendarClassName={s.date_picker}
            dayClassName={getDayClassName}
            popperClassName={s.datePickerPopper}
            {...register('date')}
            selected={selectedDate}
            minDate={new Date()}
            onChange={handleDateChange}
            placeholderText="Booking date"
            dateFormat="yyyy-MM-dd"
            inputProps={{
              autocomplete: 'off',
            }}
          />
          <textarea
            className={s.text}
            {...register('comment')}
            placeholder="Comment"
            autoComplete="off"
          />
        </div>
        <Btn type="submit" title="Send">
          Send
        </Btn>
      </form>
    </div>
  );
};
