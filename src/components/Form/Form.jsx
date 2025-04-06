import React, { useState } from 'react';
import s from './BookForm.module.css';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { Btn } from '../Btn/Btn.jsx';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  userEmail: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  bookingDate: Yup.date().nullable().required('Date is required'),
  message: Yup.string().max(500, 'Comment must be no more than 500 characters'),
});

export const Form = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: '',
      userEmail: '',
      bookingDate: null,
      message: '',
    },
  });

  const onSubmit = () => {
    toast.success('You have booked the car successfully!');
    reset();
    setSelectedDate(null);
  };

  const isToday = date => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getDayClass = date => {
    let classes = s.datePickerDay;
    if (isToday(date)) {
      classes += ` ${s.datePickerDayToday}`;
    }
    return classes;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>

      <div className={s.inputs}>
        <div>
          <input
            className={s.input}
            type="text"
            placeholder="Name*"
            {...register('fullName')}
            autoComplete="name"
            autoFocus
            aria-invalid={!!errors.fullName}
            aria-describedby="name-error"
            required
          />
          {errors.fullName && (
            <span id="name-error" className={s.error_name}>
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div>
          <input
            className={s.input}
            type="email"
            placeholder="Email*"
            {...register('userEmail')}
            autoComplete="email"
            aria-invalid={!!errors.user_mail}
            aria-describedby="email-error"
            required
          />
          {errors.userEmail && (
            <span id="email-error" className={s.error_mail}>
              {errors.userEmail.message}
            </span>
          )}
        </div>

        <div>
          <DatePicker
            className={s.calendar}
            calendarClassName={s.date_picker}
            dayClassName={getDayClass}
            popperClassName={s.datePickerPopper}
            selected={selectedDate}
            minDate={new Date()}
            onChange={date => {
              setSelectedDate(date);
              setValue('bookingDate', date);
            }}
            placeholderText="Booking date*"
            dateFormat="yyyy-MM-dd"
            aria-label="Choose a booking date"
            aria-describedby="date-error"
          />
          {errors.bookingDate && (
            <span id="date-error" className={s.errorDate}>
              {errors.bookingDate.message}
            </span>
          )}
        </div>

        <div>
          <textarea
            className={s.text}
            placeholder="Comment (optional)"
            {...register('message')}
            rows={4}
            autoComplete="off"
            aria-describedby="comment-error"
          />
          {errors.message && (
            <span id="comment-error" className={s.errorComment}>
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      <Btn type="submit" title="Send">
        Send
      </Btn>
    </form>
  );
};
