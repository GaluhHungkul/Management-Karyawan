import { create } from "zustand";

interface IuseSorting {
    sorting : {
        orderBy : string;
        value : string
    };
    setSorting : (orderBy:string, value:string) => void
}

const useSorting = create<IuseSorting>((set) => ({

    sorting : { orderBy : '', value : '' },
    setSorting : (orderBy, value) => set({sorting : { orderBy, value }})

}))

export default useSorting