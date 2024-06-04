// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { CircularProgress } from '@mui/material'
import { useGeneralUploadMutation } from '@data/upload/general-upload-mutation'


type PropTypes = {
    getFile: (val: any) => void;
    removeAllFile: () => void;
    errorMsg: string | undefined | null;
    data?: string[] | undefined | null;
}

const MultipleImageUploader = ({ getFile, errorMsg, removeAllFile, data }: PropTypes) => {
    // ** State
    const [files, setFiles] = useState<string[]>(data ? [].concat(data) : [])
    const { mutate: upload, isLoading: loading } = useGeneralUploadMutation();

    // ** Hooks
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: (acceptedFiles: File[]) => {
            upload(acceptedFiles as any, {
                onSuccess: (res: Array<string>) => {
                    const url: string = res[0];
                    console.log(url)
                    if (url) {
                        setFiles((prevVal) => [...prevVal, url])
                        getFile([...files, url])
                    }
                }
            })
        }
    })

    const renderFilePreview = (file: string) => {
        return <img width={38} height={38} alt={"Image"} src={file} />
    }

    const handleRemoveFile = (file: string) => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter((i: string) => i !== file)
        setFiles([...filtered])
        getFile([...filtered])
    }

    const fileList = files?.map((file: string) => (
        <ListItem key={file} >
            <div className='file-details'>
                <div className='file-preview'>{renderFilePreview(file)}</div>
            </div>
            <IconButton onClick={() => handleRemoveFile(file)}>
                <Icon icon='tabler:x' fontSize={20} />
            </IconButton>
        </ListItem>
    ))

    const handleRemoveAllFiles = () => {
        setFiles([])
        removeAllFile()
    }

    return (
        <Fragment>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            mb: 5,
                            width: 48,
                            height: 48,
                            display: 'flex',
                            borderRadius: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
                        }}
                    >
                        <Icon icon='tabler:upload' fontSize='1.75rem' />
                    </Box>
                    <Typography variant='body2'>
                        Upload an image or drag and drop PNG, JPG
                    </Typography>
                </Box>
            </div>

            {errorMsg && (
                <Typography variant='body2' sx={{ mt: 1, mb: 0, color: 'red' }}>
                    {errorMsg as string}
                </Typography>
            )}
            {loading && <List><CircularProgress /></List>}
            {files.length ? (
                <Fragment>
                    <List>{fileList}</List>
                    <div className='buttons'>
                        <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                            Remove All
                        </Button>
                    </div>
                </Fragment>
            ) : null}
        </Fragment>
    )
}

export default MultipleImageUploader
