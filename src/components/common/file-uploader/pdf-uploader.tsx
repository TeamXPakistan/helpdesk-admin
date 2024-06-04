// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import Link from 'next/link';
import { useGeneralUploadMutation } from '@data/upload/general-upload-mutation'
import { CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface FileProp {
    name: string
    type: string
    size: number
}


type PropTypes = {
    getFile: (val: any) => void;
    removeFile: () => void;
    errorMsg: string | undefined | null
    data?: string
}

const PDFuploader = ({ removeFile, errorMsg, getFile, data }: PropTypes) => {
    // ** State
    const [files, setFiles] = useState<File[]>(data ? [].concat(data) : [])
    const [uploadedFile, setUploadedFile] = useState<string>(data ? data : "")
    const { t } = useTranslation(["common"])

    // ** Hooks
    const { mutate: upload, isLoading: loading } = useGeneralUploadMutation();

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "application/pdf": [".pdf"]
        },
        multiple: false,
        onDrop: (acceptedFiles: File[]) => {
            upload(acceptedFiles as any, {
                onSuccess: (res: string[]) => {
                    const url = res[0]
                    if (url) {
                        setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
                        getFile(url)
                        setUploadedFile(url)
                    }
                }
            })
        }
    })

    const renderFilePreview = (file: FileProp) => {
        if (file?.type?.startsWith('image')) {
            return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
        } else {
            return <Icon icon='tabler:file-description' />
        }
    }

    const handleRemoveFile = (file: FileProp) => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
        setFiles([...filtered])
        removeFile()
    }

    const fileList = files.map((file: FileProp) => (

        <ListItem key={file.name}>
            <div className='file-details'>
                <div className='file-preview'>{renderFilePreview(file)}</div>
                <div>
                    <Link href={uploadedFile} target="_blank">
                        {t("common:view-file")}
                    </Link>
                </div>
            </div>
            <IconButton onClick={() => handleRemoveFile(file)}>
                <Icon icon='tabler:x' fontSize={20} />
            </IconButton>
        </ListItem>
    ))

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
                        Upload PDF or drag and drop PDF
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
                    {/* <div className='buttons'>
                        <Button color='error' variant='outlined' size='small' onClick={handleRemoveAllFiles}>
                            Remove
                        </Button>
                    </div> */}
                </Fragment>
            ) : null}
        </Fragment>
    )
}

export default PDFuploader
