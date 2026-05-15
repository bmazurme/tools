// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/jsx-props-no-spreading */
// import { Controller, type Control } from 'react-hook-form';
// import { TextInput } from '@gravity-ui/uikit';

// type FormPayload = ItemType & HeatConsumption | RainRoof;

// interface FormFieldProps {
//   fieldConfig: FieldConfig;
//   control: Control<FormPayload>;
// }

// interface FieldConfig {
//   name: string;
//   label: string;
//   required?: string;
//   pattern?: {
//     value: RegExp;
//     message: string;
//   };
//   placeholder?: string;
// }

// interface FormFieldProps {
//   fieldConfig: FieldConfig;
//   control: Control<any>;
// }

// export default function FormField({ fieldConfig, control }: FormFieldProps) {
//   return (
//     // <Controller
//     //   key={fieldConfig.name}
//     //   name={fieldConfig.name as string}
//     //   rules={{
//     //     pattern: fieldConfig.pattern,
//     //     required: fieldConfig.required,
//     //   }}
//     //   control={control}
//     //   render={({ field, fieldState }) => (
//     //     <TextInput
//     //       {...field}
//     //       {...fieldConfig}
//     //       value={`${field.value}`}
//     //       size="l"
//     //       type="text"
//     //       error={fieldState.error?.message}
//     //       label={fieldConfig.label}
//     //     />
//     //   )}
//     // />
//   );
// }
