export const getTemperatureColorClass = (tempC: number): string => {
    if (tempC <= 0) return "bg-weather-sky-light";
    if (tempC <= 10) return "bg-weather-sky";
    if (tempC <= 20) return "bg-weather-mint";
    if (tempC <= 30) return "bg-weather-sun";
    return "bg-weather-rose";
};

export const getCircleColorClass = (tempC: number): string => {
    if (tempC <= 0) return "bg-[#CFE6FF]";
    if (tempC <= 10) return "bg-[#AED3F4]";
    if (tempC <= 20) return "bg-[#BCE7E0]";
    if (tempC <= 30) return "bg-[#FFE7B8]";
    return "bg-[#F7BFC4]";
};