import React from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '../ui/form';
import { Checkbox } from '../ui/checkbox';

type Props = {
  facility: string;
  field: ControllerRenderProps<
    {
      title: string;
      description: string;
      image: string;
      country: string;
      state: string;
      city: string;
      facilities: string[];
    },
    'facilities'
  >;
};
function FacilityCheckbox({ facility, field }: Props) {
  return (
    <FormItem className="flex items-center space-x-2 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value.includes(facility)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, facility]);
            } else {
              field.onChange(
                field.value.filter((val: string) => val !== facility)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-medium leading-none">
        {facility}
      </FormLabel>
    </FormItem>
  );
}

export default FacilityCheckbox;
