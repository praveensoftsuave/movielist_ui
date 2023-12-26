import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UploadImage from "./UploadImage";
import Input from "../../common/Input";
import { AuthService } from "../../services/movieService";
import ActionButton from "../../common/ActionButton";
import spinner from "../../assets/images/spinner.gif"
import { toast } from "react-toastify";

type movieForm = {
  title: string,
  year: string,
  imgUrl: string,
}

export const defaultConfig: any = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
}


const defaultValues: movieForm = {
  title: "",
  year: "",
  imgUrl: "",
}

function CreateEditMovie() {
  const [files, setFiles] = useState([])
  const { movieId } = useParams()
  const navigate = useNavigate()
  const movieService = new AuthService();
  const [loading, setLoading] = useState(false)
  const [submiting, setSubmiting] = useState(false)

  const methods = useForm({
    defaultValues
  })

  const { reset, getValues } = methods

  const getMoviedetail = async () => {
    setLoading(true)
    const res = await movieService.getMovieById(movieId)
    setLoading(false)
    const data = res?.data
    if (data) {
      reset({
        title: data?.title,
        year: data?.year,
        imgUrl: data?.imgUrl,
      })
    }
  }

  useEffect(() => {
    if (movieId) {
      getMoviedetail()
    }
  }, [movieId])

  const handleSubmit = async (data: any) => {
    const payload = { ...data }
    if (movieId) {
      setSubmiting(true)
      if (files.length > 0) {
        let obj = new FormData();
        obj.append("file", files[0]);
        const upload = await movieService.fileUpload(obj);
        if (upload?.data?.url?.length > 0) {
          payload.imgUrl = upload.data.url[0]
        } else {
          toast.error('Image failed to upload!', defaultConfig);
        }
      }
      const editMovie = await movieService.updateMovie(movieId, payload)
      setSubmiting(false)
      if (editMovie?.status === 200) {
        toast.success('Movie updated successfully', defaultConfig);
        navigate("/movie")
      } else {
        toast.error(editMovie?.message, defaultConfig);
      }
    } else if (files?.length > 0) {
      let obj = new FormData();
      obj.append("file", files[0]);
      setSubmiting(true)
      const upload = await movieService.fileUpload(obj);
      if (upload?.data?.url?.length > 0) {
        const payload = {
          ...data,
          imgUrl: upload.data.url[0],
        }
        const addMovie = await movieService.createMovie(payload)
        setSubmiting(false)
        if (addMovie?.status === 200) {
          toast.success('Movie created successfully', defaultConfig);
          navigate("/movie")
        } else {
          toast.error(addMovie?.message, defaultConfig);
        }
      } else {
        toast.error('Image failed to upload!', defaultConfig);
        setSubmiting(false)
      }
    } else {
      toast.error('Please Upload Image', defaultConfig);
    }
  }

  return (
    <FormProvider {...methods}>
      {loading ? <div className="loader-container"><img src={spinner} alt="spinner" className="spinner" /></div> :
        <form className="login-container" onSubmit={methods.handleSubmit(data => handleSubmit(data))}>
          <div className="movies">
            <div className="heading">{movieId ? "Edit" : "Create a new movie"}</div>
            <div className="fields-container">
              <UploadImage
                // accept=".png, .svg, .jpeg, .jpg"
                accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.svg'] }}
                maxSize={2097152}
                files={files}
                imgUrl={getValues("imgUrl")}
                setFiles={setFiles}
              />
              <div className="right-parent">
                <div className="right-fields">
                  <Input
                    name='title'
                    placeholder='Title'
                    rules={{
                      required: "This field is required"
                    }}
                  />
                  <Input
                    className='year-field'
                    name='year'
                    placeholder='Publishing year'
                    rules={{
                      required: "This field is required",
                      pattern: {
                        value: /^\d+$/,
                        message: 'Please enter valid year'
                      },
                      maxLength: { value: 4, message: "Please enter valid year" }
                    }}
                  />
                  <div className="button-wrapper">
                    <ActionButton text={"Cancel"} onClick={() => {
                      navigate("/movie")
                    }} disabled={submiting} />
                    <ActionButton text={movieId ? "Update" : "Submit"} disabled={submiting} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </FormProvider>
  );
}

export default CreateEditMovie;