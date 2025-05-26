import Image from "next/image";
import { Popover, PopoverTarget, PopoverDropdown, NumberInput } from '@mantine/core';

export default function Home() {
  return (
    <div className="justify-items-center p-10">
      <p className="text-3xl font-sans">Hello, World!</p>
      <Popover>
        <PopoverTarget className="p-1 bg-purple-300 mt-5 cursor-pointer rounded-sm font-sans shadow-md"><p>Click me for dropdown</p></PopoverTarget>
        <PopoverDropdown><p>Dropdown Stuff</p></PopoverDropdown>
      </Popover>
    </div>
  );
}
