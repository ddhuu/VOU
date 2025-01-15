import { toast } from "@/hooks/use-toast";
import { EntityError, ErrorResponse } from "@/schema/http.schema";
import { clsx, type ClassValue } from "clsx";
import { Params } from "next/dist/server/request/params";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const defaultAvatar = "https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png";
export const defaultGameImage =
    "https://t4.ftcdn.net/jpg/04/42/21/53/360_F_442215355_AjiR6ogucq3vPzjFAAEfwbPXYGqYVAap.jpg";
export const defaultVoucherImage = "https://agencyvn.com/wp-content/uploads/2019/05/Voucher-l%C3%A0-g%C3%AC.jpg";
export const defaultEventImage = "http://image.gmarket.co.kr/service_image/2020/01/28/20200128144035177873_0_0.jpg";
export const isClient = () => typeof window !== "undefined";

export const handleErrorApi = ({
    error,
    setError,
    duration,
}: {
    error: any;
    setError?: UseFormSetError<any>;
    duration?: number;
}) => {
    // console.log(error);
    if (error instanceof EntityError && setError) {
        error.payload.errors.forEach((item) => {
            setError(item.field, {
                type: "server",
                message: item.message,
            });
        });
    } else {
        toast({
            title: "Error",
            description: error?.payload?.message || "Unexpected error! Please try again.",
            variant: "destructive",
            duration: duration || 2000,
        });
    }
};

export const handleErrorForm = ({ error, setError }: { error: EntityError; setError: UseFormSetError<any> }) => {
    error.payload.errors.forEach((item) => {
        setError(item.field, {
            type: "server",
            message: item.message,
        });
    });
};

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
    return path.startsWith("/") ? path.slice(1) : path;
};

export function getQueryParams<T>(params: Params, key: string): T {
    const value = params[key];
    if (!value) throw new Error(`"${key}" not found`);
    return typeof value === "string" ? (value as T) : (value[0] as T);
}

export function printDateTime(date: Date | null | undefined) {
    if (!date) return "N/A";
    return date.toLocaleString();
}

export function printTime(date: Date) {
    if (!date) return "";
    const hour = date.getHours();
    const hourLabel = hour > 9 ? hour : "0" + hour;
    const minute = date.getMinutes();
    const minuteLabel = minute > 9 ? minute : "0" + minute;
    const second = date.getSeconds();
    const secondLabel = second > 9 ? second : "0" + second;
    return `${hourLabel}:${minuteLabel}:${secondLabel}`;
}

export function printTimeNoSecond(date: Date) {
    if (!date) return "";
    const hour = date.getHours();
    const hourLabel = hour > 9 ? hour : "0" + hour;
    const minute = date.getMinutes();
    const minuteLabel = minute > 9 ? minute : "0" + minute;
    return `${hourLabel}:${minuteLabel}`;
}

export const convertToVietnamTimezone = (datetime: string, timezone: number): string => {
    const date = new Date(datetime);
    date.setHours(date.getHours() + timezone);
    return date.toISOString().slice(0, 16);
};

export const formatFullToSimpleDateTime = (fullDatetime: string): string => {
    const date = new Date(fullDatetime);
    return date.toISOString().slice(0, 16);
};

export const addTime = (date: Date, hours: number = 0, minutes: number = 0, seconds: number = 0): Date => {
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    date.setSeconds(date.getSeconds() + seconds);
    return date;
};

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${day}-${month}`;
}
