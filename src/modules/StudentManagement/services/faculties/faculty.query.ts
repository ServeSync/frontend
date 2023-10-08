import { useQuery } from "@tanstack/react-query";
import facultyAPI from "../faculty.api";
import { FacultyType } from "../../interfaces/faculty.type";

class GetAllFacultyQuery {
    private query;
    
    constructor() {
        this.query = useQuery({
            queryKey: ['faculties'],
            queryFn: () => facultyAPI.getListFaculties(),
            staleTime: 5 * 60 * 1000
        })
    }

    fetch () {
        return this.query.data?.data as FacultyType[];
    }

    getQuery() {
        return this.query;
    }
}

export {
    GetAllFacultyQuery
}