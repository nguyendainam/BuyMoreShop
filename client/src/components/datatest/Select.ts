 const OptionsPr = [
  { value: "color", label: "Color" },
  { value: "size", label: "Size" },
  { value: "screenSizeOptions", label: "Screen Size Options" },
  { value: "memoryOptions", label: "Memory Options" },
  { value: "scanFrequency", label: "Scan Frequency" },
  { value: "screenType", label: "ScreenType" },
];


 const size = [
  { value: "1", label: "Small" },
  { value: "2", label: "Large" },
  { value: "3", label: "Medium" },
  { value: "4", label: "Extra Large" },
  { value: "5", label: "Compact" },
  { value: "6", label: "Oversized" },
  { value: "7", label: "Regular" },
  { value: "8", label: "Big" },
];

 const color = [
  { value: "R", label: "Red" },
  { value: "B", label: "Blue" },
  { value: "G", label: "Green" },
  { value: "Y", label: "Yellow" },
  { value: "P", label: "Pink" },
  { value: "S", label: "Silver" },
  { value: "W", label: "White" },
  { value: "Gy", label: "Gray" },
];

 const screenSizeOptions = [
  { value: "15", label: "15 inches" },
  { value: "17", label: "17 inches" },
  { value: "21", label: "21 inches" },
  { value: "24", label: "24 inches" },
  { value: "27", label: "27 inches" },
  { value: "32", label: "32 inches" },
  { value: "34", label: "34 inches" },
  { value: "38", label: "38 inches" },
  { value: "42", label: "42 inches" },
  { value: "49", label: "49 inches" },
  // Thêm các kích thước màn hình khác tùy thuộc vào nhu cầu và xu hướng thị trường
];


 export const memoryOptions = [
  { value: "4GB", label: "4GB" },
  { value: "8GB", label: "8GB" },
  { value: "16GB", label: "16GB" },
  { value: "32GB", label: "32GB" },
  // Thêm dung lượng bộ nhớ khác tùy thuộc vào nhu cầu của bạn
];

 const scanFrequency = [
  { value: "60", label: "60 Hz" },
  { value: "75", label: "75 Hz" },
  { value: "120", label: "120 Hz" },
  { value: "144", label: "144 Hz" },
  { value: "240", label: "240 Hz" },
  // Thêm các tần số quét khác tùy thuộc vào nhu cầu của bạn
];

// Mảng cho loại màn hình
 const screenType = [
  { value: "LCD", label: "LCD" },
  { value: "LED", label: "LED" },
  { value: "OLED", label: "OLED" },
  { value: "IPS", label: "IPS" },
  { value: "TN", label: "TN" },
  // Thêm các loại màn hình khác tùy thuộc vào nhu cầu của bạn
];


export default {
  OptionsPr,
  color,
  size,
  screenSizeOptions,
  scanFrequency,
  screenType,
  memoryOptions
}