import { useMutation, useQueryClient } from "@tanstack/react-query";
import imageAPI from "../image.api";
import studentAPI from "../student.api";
import { StudentForm } from "../../interfaces/student.type";

class CreateStudentCommandHandler {
    private uploadImageMutation;
    private createStudentMutation;
    private queryClient;

    constructor() {
        this.uploadImageMutation = useMutation(imageAPI.uploadImage);
        this.createStudentMutation = useMutation({
            mutationFn: (body: StudentForm) => studentAPI.createStudent(body)
        });
        this.queryClient = useQueryClient();
    }

    handle = async(
        student: any, 
        file: File, 
        handleSuccess: any,
        handleError: any,
        setIsLoading: any) => {
    
        setIsLoading(true);

        const form = new FormData()
        form.append('file', file)

        const uploadImageResponse = await this.uploadImageMutation.mutateAsync(form, {
            onError: (error: any) => {
                error.response.data.code = 'InvalidImage';

                handleError();
            }
        });

        student.imageUrl = uploadImageResponse.data.url;
    
        return this.createStudentMutation.mutate(student, {
            onSuccess: () => {
                this.queryClient.invalidateQueries({
                    queryKey: ['students']
                });
                setIsLoading(false);
                
                handleSuccess();
            },
            onError: (error: any) => {
                setIsLoading(false);

                handleError(error);
            }
        })
    }
}

export {
    CreateStudentCommandHandler
};