import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { Divider, FormErrorMessage, Heading, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { useCreateResumeMutation } from '../generated/graphql/graphql';

export const ResumeUploadForm: React.FC<{}> = () => {
  const toast = useToast();
  const [, createResume] = useCreateResumeMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      resumeFile: null as File,
    },
    onSubmit: async (values) => {
      const { error } = await createResume({
        resumeInput: { name: values.name, file: values.resumeFile },
      });

      if (error) {
        toast({
          title: 'Error',
          description: 'Your resume could not be created at this time',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      // success
      toast({
        title: 'Resume created!',
        description: 'Your resume can now be reviewed',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.name) {
        errors.name = 'Required';
      }

      if (!values.resumeFile) {
        errors.resumeFile = 'Required';
      }

      if (values.resumeFile && values.resumeFile.size > 1_000_000) {
        errors.resumeFile = 'Resume file exceeds maximum size (1 MB)';
      }

      if (values.resumeFile && values.resumeFile.type != 'application/pdf') {
        errors.resumeFile = 'Resume file must be a PDF';
      }

      return errors;
    },
  });

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      padding="20px"
      margin="20px"
      borderRadius="md"
      backgroundColor="white"
    >
      <Heading as="h3" size="md">
        New Resume
      </Heading>
      <Divider marginY="15px" />

      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={formik.errors.name && formik.touched.name}
          marginTop="20px"
        >
          <FormLabel>Resume Name</FormLabel>
          <Input
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="My first resume"
            required
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          <FormHelperText>
            A friendly name to identify this resume
          </FormHelperText>
        </FormControl>

        <FormControl
          isInvalid={!!(formik.errors.resumeFile && formik.touched.resumeFile)}
          marginTop="20px"
        >
          <FormLabel>Resume File</FormLabel>
          <input
            type="file"
            onChange={(e) =>
              formik.setFieldValue('resumeFile', e.target.files[0])
            }
            required
          />
          <FormErrorMessage>{formik.errors.resumeFile}</FormErrorMessage>
          <FormHelperText>Must be a PDF file</FormHelperText>
        </FormControl>

        <Button
          marginTop="40px"
          type="submit"
          colorScheme="purple"
          isLoading={formik.isSubmitting}
          disabled={!formik.dirty}
        >
          Create Resume
        </Button>
      </form>
    </Box>
  );
};
