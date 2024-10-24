'use client';

import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@/components/ui/select';
import { updateOrderStatus } from './actions';

const statuses = [
  {
    label: 'New',
    value: 'New',
  },
  {
    label: 'Payed',
    value: 'paid',
  },
  {
    label: 'Shipped',
    value: 'shipped',
  },
  {
    label: 'Delivered',
    value: 'delivered',
  },
];

export default function StatusSelector({
  status,
  id,
}: {
  status: string;
  id: number;
}) {
  return (
    <Select
      defaultValue={status}
      onValueChange={(value) => updateOrderStatus(id, value)}
    >
      <SelectTrigger>
        <SelectInput placeholder="Select option" />
        <SelectIcon className="mr-3" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {statuses.map((status) => (
            <SelectItem
              key={status.value}
              label={status.label}
              value={status.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
