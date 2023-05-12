import * as yup from 'yup';
import { Box, Chip, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

export default function ProjectForm ({ onSubmit, editValues }) {

  const defaultValues = {
    name: "",
    description: "",
    overview: "",
    tools: [],
    imageUrl: "",
    projectLink: "",
  }

  const [skills, setSkills] = useState([])

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch(
        "https://mike-skills-api-123123-default-rtdb.firebaseio.com/skills.json"
      );
      const data = await response.json();
      const skillsArray = data.split(",");
      setSkills(skillsArray);
    } catch (error) {
      console.error(error);
    }
  }

  const projectFormSchema = yup.object().shape({
    name: yup.string().required('You need to add a name.'),
    description: yup.string(),
    overview: yup.string(),
    tools: yup.array(),
    imageUrl: yup.string(),
    projectLink: yup.string(),
  })

  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues: editValues || defaultValues,
    resolver: yupResolver(projectFormSchema),
    mode: 'all',
  })

  const imageUrlValue = watch('imageUrl')

  return (
    <form
      id='project-form'
      onReset={() => reset(defaultValues)}
      onSubmit={handleSubmit(onSubmit)}
      style={{ padding: '24px' }}
    >
      <Grid container spacing={ 4 }>
        <Grid item xs={8}>
          <Controller
            control={ control }
            name='name'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Project Name'
                variant='outlined'
                fullWidth
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        <Grid item xs={ 12 }>
          <Controller
            control={ control }
            name='description'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Description'
                variant='outlined'
                fullWidth
                multiline
                minRows={2}
                maxRows={2}
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={ control }
            name='overview'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Overview'
                variant='outlined'
                fullWidth
                multiline
                minRows={5}
                maxRows={5}
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id='tools-label'>
            Tools
          </InputLabel>
          <Controller
            control={ control }
            name='tools'
            render={ ({ field }) => (
              <Select
                { ...field }
                labelId='tools-label'
                variant='outlined'
                fullWidth
                multiple
                renderValue={(selected) => (
                  <Box>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {skills.map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={ control }
            name='projectLink'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Project link'
                variant='outlined'
                fullWidth
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={ control }
            name='imageUrl'
            render={ ({ field, fieldState }) => (
              <TextField
                { ...field }
                label='Image URL'
                variant='outlined'
                fullWidth
                error={ !!fieldState.error }
                helperText={ fieldState.error?.message }
              />
            )}
          />
        </Grid>
        {
          imageUrlValue &&
          <Grid item xs={12}>
            <img
              src={imageUrlValue}
              alt='project-image'
              style={{ width: '100%' }}
            />
          </Grid>
        }
      </Grid>
    </form>
  )
}