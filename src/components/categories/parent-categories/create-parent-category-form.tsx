import React from 'react';
import { useFormik } from 'formik';
import { CardHeader, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomButton from "@components/common/Button/custom-button";
import CustomTextField1 from "@components/common/text-field/custom-text-field-1";
import { useCreateParentCategoryMutation } from '@data/category/create-parent-category-mutation';
import createParentCategorySchema from './create-parent-category-schema';
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone';
import SingleImageUploader from '@components/common/file-uploader/single-image-uploader';

type FormValues = {
    approvalRequired: boolean;
    callTime: number;
    ratePerHour: number;
    image: string | null;
    translations: {
        en: {
            name: string;
            language: string;
        },
        ar: {
            name: string;
            language: string;
        },
    };
};

const initialValues: FormValues = {
    approvalRequired: false,
    callTime: 0,
    ratePerHour: 0,
    image: "",
    translations: {
        en: {
            name: "", language: "en"
        },
        ar: {
            name: "", language: "ar"
        }
    }
};

const CreateParentCategoryForm = () => {
    const { t } = useTranslation(['form']);
    const { mutate: createParentCategory, isLoading } = useCreateParentCategoryMutation();

    const { handleSubmit, errors, setFieldValue, getFieldProps, values } = useFormik({
        initialValues,
        validationSchema: createParentCategorySchema,
        onSubmit: (values, { resetForm }) => handleCreateParentCategory(values, resetForm),
    });

    const handleCreateParentCategory = (values: FormValues, resetForm: any) => {
        const formData = {
            ...values,
            callTime: Number(values.callTime),
            ratePerHour: Number(values.ratePerHour),
        };
        createParentCategory(
            {
                callTime: formData?.callTime,
                ratePerHour: formData?.ratePerHour,
                image: formData?.image,
                approvalRequired: formData?.approvalRequired,
                translations: [
                    {
                        name: formData?.translations?.en?.name,
                        language: formData?.translations?.en?.language
                    },
                    {
                        name: formData?.translations?.ar?.name,
                        language: formData?.translations?.ar?.language
                    }
                ]
            },
            {
                onSuccess: () => {
                    resetForm({ values: '' });
                }
            }
        )
    };

    return (
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <CardHeader
                title={`Category Image`}
                subheader={`Upload your category image from here`}
                sx={{ p: 0 }}
                titleTypographyProps={{ fontSize: "0.9rem !important" }}
            />
            <DropzoneWrapper>
                <SingleImageUploader
                    errorMsg={t(errors.image as string)}
                    getFile={(val) => setFieldValue("image", val)}
                    removeFile={() => setFieldValue("image", "")}
                    data={initialValues?.image}
                />
            </DropzoneWrapper>

            <Typography variant='h6' sx={{ mb: 5, mt: 5 }}>{t('English Translation')}</Typography>
            <div style={{ display: 'flex' }}>
                <CustomTextField1
                    errorMsg={t(errors?.translations?.en?.name as string)}
                    fullWidth
                    sx={{ mb: 5, mr: 1 }}
                    label={t(`Name`)}
                    {...getFieldProps('translations.en.name')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.translations?.en?.language as string)}
                    fullWidth
                    sx={{ mb: 5, ml: 1 }}
                    label={t(`Language`)}
                    disabled
                    {...getFieldProps('translations.en.language')}
                />
            </div>

            <Typography variant='h6' sx={{ mb: 5 }}>{t('Arabic Translation')}</Typography>
            <div style={{ display: 'flex' }}>
                <CustomTextField1
                    errorMsg={t(errors?.translations?.ar?.name as string)}
                    fullWidth
                    sx={{ mb: 5, mr: 1 }}
                    label={t(`Name`)}
                    {...getFieldProps('translations.ar.name')}
                />
                <CustomTextField1
                    errorMsg={t(errors?.translations?.ar?.language as string)}
                    fullWidth
                    sx={{ mb: 5, ml: 1 }}
                    label={t(`Language`)}
                    disabled
                    {...getFieldProps('translations.ar.language')}
                />
            </div>
            <CustomTextField1
                errorMsg={t(errors?.ratePerHour as string)}
                fullWidth
                sx={{ mb: 5 }}
                label={t(`Rate Per Hour`)}
                {...getFieldProps('ratePerHour')}
            />

            <CustomTextField1
                errorMsg={t(errors?.callTime as string)}
                fullWidth
                sx={{ mb: 5 }}
                label={t(`Call Time`)}
                {...getFieldProps('callTime')}
            />

            <FormControl fullWidth sx={{ mb: 5 }}>
                <InputLabel>Approval</InputLabel>
                <Select
                    {...getFieldProps('approvalRequired')}
                    label={t(`Approval`)}
                    value={values.approvalRequired}
                    onChange={(e) => setFieldValue('approvalRequired', e.target.value as boolean)}
                >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                </Select>

            </FormControl>

            <CustomButton
                variant='contained'
                sx={{ mb: 4, mt: 8 }}
                disabled={isLoading}
                loading={isLoading}
                type='submit'
                fullWidth={true}
            >
                {t(`Create`)}
            </CustomButton>
        </form >
    );
};

export default CreateParentCategoryForm;
