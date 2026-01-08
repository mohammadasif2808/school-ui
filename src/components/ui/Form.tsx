import React from 'react';
import { useForm, UseFormReturn, SubmitHandler, FieldValues, UseFormProps } from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  children: (methods: UseFormReturn<T>) => React.ReactNode;
  onSubmit: SubmitHandler<T>;
  options?: UseFormProps<T>;
  className?: string;
}

export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  options,
  className,
}: FormProps<T>) => {
  const methods = useForm<T>(options);

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={className}
    >
      {children(methods)}
    </form>
  );
};
