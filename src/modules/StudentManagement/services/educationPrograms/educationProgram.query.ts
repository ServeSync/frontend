import { useQuery } from "@tanstack/react-query";
import educationProgramAPI from "../education_program.api";
import { EducationProgramType } from "../../interfaces/education_program.type";

class GetAllEducationProgramQuery {
    private query;
    
    constructor() {
        this.query = useQuery({
            queryKey: ['education_programs'],
            queryFn: () => educationProgramAPI.getListEducationPrograms(),
            staleTime: 5 * 60 * 1000
        });  
    }

    fetch () {
        return this.query.data?.data as EducationProgramType[];
    }

    getQuery() {
        return this.query;
    }
}

export {
    GetAllEducationProgramQuery
}