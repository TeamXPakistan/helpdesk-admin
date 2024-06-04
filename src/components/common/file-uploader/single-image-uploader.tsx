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
import { CircularProgress } from '@mui/material'
import { useGeneralUploadMutation } from '@data/upload/general-upload-mutation'
import { useTranslation } from 'react-i18next'

type PropTypes = {
    getFile: (val: any) => void;
    removeFile: () => void;
    errorMsg: string | undefined | null;
    data?: string | undefined | null;
}

const SingleImageUploader = ({ getFile, errorMsg, removeFile, data }: PropTypes) => {
    // ** State
    const [files, setFiles] = useState<string[]>(data ? [].concat(data) : [])
    const { mutate: upload, isLoading: loading } = useGeneralUploadMutation();
    const { t } = useTranslation(["form"]);

    // ** Hooks
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: (acceptedFiles: File[]) => {
            upload(acceptedFiles as any, {
                onSuccess: (res: string[]) => {
                    const url = res[0];
                    if (url) {
                        setFiles(() => [url])
                        getFile(url)
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
        removeFile()
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
                        {t('form:placeholder-image-upload')}
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
                </Fragment>
            ) : null}
        </Fragment>
    )
}

export default SingleImageUploader
