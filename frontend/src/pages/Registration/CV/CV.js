import React from 'react'
import { useState, useEffect } from 'react'
import { X } from 'react-feather'
import InputControl from '../InputControl/InputControl'
import styles from './CV.module.css'
import { updateUser } from '../../../util/api-call'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import Spinner from '../../Spinner'

const CV = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAlwf9wHwxVygoTP-_MehmYx1plLbzViVA',
    libraries: ['places'],
  })
  // Maps
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  // Props
  const sections = props.sections
  const information = props.information
  //States
  const [activeDetailIndex, setActiveDetailIndex] = useState(0)
  const [sectionTitle, setSectionTitle] = useState(
    sections[Object.keys(sections)[0]]
  )

  const [activeInformation, setActiveInformation] = useState(
    information[sections[Object.keys(sections)[0]]]
  )
  const [activeSectionKey, setActiveSectionKey] = useState(
    Object.keys(sections)[0]
  )
  const [values, setValues] = useState({
    title: activeInformation?.detail?.title || '',
    address: activeInformation?.detail?.address || '',
    phone: activeInformation?.detail?.phone || '',
  })

  const [submissionData, setSubmissionData] = useState({
    title: '',
    address: '',
    phone: '',

    summary: '',
    CV: {
      workExp: [],
      project: [],
      education: [],
      achievement: [],
      other: {},
    },
  })
  // Bodies
  const workExpBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl
          label='Title'
          placeholder='Enter title eg. Frontend developer'
          value={values.title}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
        <InputControl
          label='Company Name'
          placeholder='Enter company name eg. amazon'
          value={values.companyName}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, companyName: event.target.value }))
          }
        />
      </div>
      <div className={styles.row}>
        <InputControl
          label='Certificate Link'
          placeholder='Enter certificate link'
          value={values.certificationLink}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              certificationLink: event.target.value,
            }))
          }
        />
        <Autocomplete>
          <InputControl
            label='Location'
            placeholder='Enter location eg. Remote'
            value={values.location}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, location: event.target.value }))
            }
          />
        </Autocomplete>
      </div>
      <div className={styles.row}>
        <InputControl
          label='Start Date'
          type='date'
          placeholder='Enter start date of work'
          value={values.startDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, startDate: event.target.value }))
          }
        />
        <InputControl
          label='End Date'
          type='date'
          placeholder='Enter end date of work'
          value={values.endDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, endDate: event.target.value }))
          }
        />
      </div>

      <div className={styles.column}>
        <label>Enter work description</label>
        <InputControl
          placeholder='Enter Description'
          value={values.description}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, description: event.target.value }))
          }
        />
      </div>
    </div>
  )
  const projectBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl
          label='Title'
          value={values.title}
          placeholder='Enter title eg. Chat app'
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>
      <InputControl
        label='Overview'
        value={values.overview}
        placeholder='Enter basic overview of project'
        onChange={(event) =>
          setValues((prev) => ({ ...prev, overview: event.target.value }))
        }
      />
      <div className={styles.row}>
        <InputControl
          label='Deployed Link'
          value={values.deployedLink}
          placeholder='Enter deployed link of project'
          onChange={(event) =>
            setValues((prev) => ({ ...prev, deployedLink: event.target.value }))
          }
        />
        <InputControl
          label='Project Link'
          placeholder='Enter github link or other link of project'
          value={values.projectLink}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, projectLink: event.target.value }))
          }
        />
      </div>
      <div className={styles.column}>
        <label>Enter project description</label>
        <InputControl
          placeholder='Line 1'
          value={values.description}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, description: event.target.value }))
          }
        />
      </div>
    </div>
  )
  const educationBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl
          label='Title'
          placeholder='Enter title eg. B-tech'
          value={values.title}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>
      <InputControl
        label='Institution Name'
        placeholder='Enter name of your University/college/school'
        value={values.instituteName}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, instituteName: event.target.value }))
        }
      />
      <div className={styles.row}>
        <InputControl
          label='Start Date'
          type='date'
          placeholder='Enter start date of this education'
          value={values.startDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, startDate: event.target.value }))
          }
        />
        <InputControl
          label='End Date'
          type='date'
          placeholder='Enter end date of this education'
          value={values.endDate}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, endDate: event.target.value }))
          }
        />
      </div>
    </div>
  )
  const basicInfoBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl
          label='Title'
          value={values.title}
          placeholder='Enter your title eg. Frontend developer'
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>
      <div className={styles.row}>
        <Autocomplete style={{ width: '100%', marginTop: '-100px' }}>
          <InputControl
            label='Address'
            placeholder='Enter your Address'
            value={values.address}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, address: event.target.value }))
            }
          />
        </Autocomplete>
        <InputControl
          label='Phone No'
          placeholder='Enter your phone number'
          value={values.phone}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phone: event.target.value }))
          }
        />
      </div>
      <div className={styles.row}>
        <InputControl
          label='Summary'
          value={values.summary}
          placeholder='Enter your short summary'
          onChange={(event) =>
            setValues((prev) => ({ ...prev, summary: event.target.value }))
          }
        />
      </div>
    </div>
  )
  const achievementsBody = (
    <div className={styles.detail}>
      <div className={styles.row}>
        <InputControl
          label='Title'
          placeholder='Enter title eg. Frontend developer'
          value={values.title}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, title: event.target.value }))
          }
        />
      </div>
      <InputControl
        label='Description'
        placeholder='Enter Description'
        value={values.description}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, description: event.target.value }))
        }
      />
    </div>
  )
  const otherBody = (
    <div className={styles.detail}>
      <InputControl
        label='Description'
        placeholder='Enter your objective/summary'
        value={values.summary}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, summary: event.target.value }))
        }
      />
      <InputControl
        label='Courses'
        placeholder='Comma Seperate Names'
        value={values.courses}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, courses: event.target.value }))
        }
      />
      <InputControl
        label='Skills'
        placeholder='Comma Seperate Skills'
        value={values.skills}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, skills: event.target.value }))
        }
      />
      <InputControl
        label='Links'
        placeholder='Enter github, linkdn etc links'
        value={values.otherLinks}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, otherLinks: event.target.value }))
        }
      />
    </div>
  )
  // Handlers
  const generateBody = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo:
        return basicInfoBody
      case sections.workExp:
        return workExpBody
      case sections.project:
        return projectBody
      case sections.education:
        return educationBody
      case sections.achievement:
        return achievementsBody
      case sections.other:
        return otherBody
      default:
        return null
    }
  }
  const handleSave = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo: {
        const tempDetail = {
          title: values.title,
          address: values.address,
          summary: values.summary,
          phone: values.phone,
        }

        props.setInformation((prev) => ({
          ...prev,
          [sections.basicInfo]: {
            ...prev[sections.basicInfo],
            detail: tempDetail,
            sectionTitle,
          },
        }))
        break
      }
      case sections.workExp: {
        const tempDetail = {
          certificationLink: values.certificationLink,
          title: values.title,
          startDate: values.startDate,
          endDate: values.endDate,
          companyName: values.companyName,
          location: values.location,
          description: values.description,
        }
        const tempDetails = [...information[sections.workExp]?.details]
        tempDetails[activeDetailIndex] = tempDetail

        props.setInformation((prev) => ({
          ...prev,
          [sections.workExp]: {
            ...prev[sections.workExp],
            details: tempDetails,
            sectionTitle,
          },
        }))
        break
      }
      case sections.project: {
        const tempDetail = {
          deployedLink: values.deployedLink,
          title: values.title,
          overview: values.overview,
          projectLink: values.projectLink,
          description: values.description,
        }
        const tempDetails = [...information[sections.project]?.details]
        tempDetails[activeDetailIndex] = tempDetail

        props.setInformation((prev) => ({
          ...prev,
          [sections.project]: {
            ...prev[sections.project],
            details: tempDetails,
            sectionTitle,
          },
        }))
        break
      }
      case sections.education: {
        const tempDetail = {
          title: values.title,
          instituteName: values.instituteName,
          startDate: values.startDate,
          endDate: values.endDate,
        }
        const tempDetails = [...information[sections.education]?.details]
        tempDetails[activeDetailIndex] = tempDetail

        props.setInformation((prev) => ({
          ...prev,
          [sections.education]: {
            ...prev[sections.education],
            details: tempDetails,
            sectionTitle,
          },
        }))
        break
      }
      case sections.achievement: {
        const tempDetail = {
          title: values.title,
          description: values.description,
        }
        const tempDetails = [...information[sections.achievement]?.details]
        tempDetails[activeDetailIndex] = tempDetail

        props.setInformation((prev) => ({
          ...prev,
          [sections.achievement]: {
            ...prev[sections.achievement],
            details: tempDetails,
            sectionTitle,
          },
        }))
        break
      }
      case sections.other: {
        const tempDetail = {
          courses: values.courses,
          skills: values.skills,
          summary: values.summary,
          otherLinks: values.otherLinks,
        }

        props.setInformation((prev) => ({
          ...prev,
          [sections.other]: {
            ...prev[sections.other],
            detail: tempDetail,
            sectionTitle,
          },
        }))
        break
      }
      default:
        return null
    }
  }
  const handleAddNew = () => {
    const details = activeInformation?.details
    if (!details) return
    const lastDetail = details.slice(-1)[0]
    if (!Object.keys(lastDetail).length) return
    details?.push({})

    props.setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }))
    setActiveDetailIndex(details?.length - 1)
  }
  const handleDeleteDetail = (index) => {
    const details = activeInformation?.details
      ? [...activeInformation?.details]
      : ''
    if (!details) return
    details.splice(index, 1)
    props.setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }))

    setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1))
  }
  const handleSubmit = async () => {
    const res = await updateUser(user.id, submissionData)

    if (res.status === 'success') {
      navigate(`/user/profile/${user.id}`)
    } else {
      // TODO: handle error
    }
  }
  // setting values
  useEffect(() => {
    const activeInfo = information[sections[activeSectionKey]]
    setActiveInformation(activeInfo)
    setSectionTitle(sections[activeSectionKey])
    setActiveDetailIndex(0)
    setValues({
      name: activeInfo?.detail?.name || '',
      overview: activeInfo?.details
        ? activeInfo.details[0]?.overview || ''
        : '',
      deployedLink: activeInfo?.details
        ? activeInfo.details[0]?.deployedLink || ''
        : '',
      projectLink: activeInfo?.details
        ? activeInfo.details[0]?.projectLink || ''
        : '',
      link: activeInfo?.details ? activeInfo.details[0]?.link || '' : '',
      certificationLink: activeInfo?.details
        ? activeInfo.details[0]?.certificationLink || ''
        : '',
      companyName: activeInfo?.details
        ? activeInfo.details[0]?.companyName || ''
        : '',
      instituteName: activeInfo?.details
        ? activeInfo.details[0]?.instituteName || ''
        : '',
      location: activeInfo?.details
        ? activeInfo.details[0]?.location || ''
        : '',
      startDate: activeInfo?.details
        ? activeInfo.details[0]?.startDate || ''
        : '',
      description: activeInfo?.details
        ? activeInfo.details[0]?.description || ''
        : '',
      endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || '' : '',
      title: activeInfo?.details
        ? activeInfo.details[0]?.title || ''
        : activeInfo?.detail?.title || '',
      country: activeInfo?.detail?.country || '',
      city: activeInfo?.detail?.city || '',
      phone: activeInfo?.detail?.phone || '',
      email: activeInfo?.detail?.email || '',
      courses: activeInfo?.detail?.courses || '',
      skills: activeInfo?.detail?.skills || '',
      summary: activeInfo?.detail?.summary || '',
      otherLinks: activeInfo?.detail?.otherLinks || '',
    })
  }, [activeSectionKey])

  useEffect(() => {
    setActiveInformation(information[sections[activeSectionKey]])
    setSubmissionData({
      title: information[sections.basicInfo]?.detail?.title || '',
      address: information[sections.basicInfo]?.detail?.address || '',
      phone: information[sections.basicInfo]?.detail?.phone || '',
      summary: information[sections.basicInfo]?.detail?.summary || '',
      CV: {
        workExp: information[sections.workExp]?.details || [],
        project: information[sections.project]?.details || [],
        education: information[sections.education]?.details || [],
        achievement: information[sections.achievement]?.details || [],
        other: information[sections.other]?.detail || {},
      },
    })
  }, [information])

  useEffect(() => {
    const details = activeInformation?.details
    if (!details) return

    const activeInfo = information[sections[activeSectionKey]]
    setValues({
      overview: activeInfo.details[activeDetailIndex]?.overview || '',
      link: activeInfo.details[activeDetailIndex]?.link || '',
      certificationLink:
        activeInfo.details[activeDetailIndex]?.certificationLink || '',
      companyName: activeInfo.details[activeDetailIndex]?.companyName || '',
      location: activeInfo.details[activeDetailIndex]?.location || '',
      startDate: activeInfo.details[activeDetailIndex]?.startDate || '',
      endDate: activeInfo.details[activeDetailIndex]?.endDate || '',
      title: activeInfo.details[activeDetailIndex]?.title || '',
      deployedLink: activeInfo.details[activeDetailIndex]?.deployedLink || '',
      projectLink: activeInfo.details[activeDetailIndex]?.projectLink || '',
      instituteName: activeInfo.details[activeDetailIndex]?.instituteName || '',
      description: activeInfo.details[activeDetailIndex]?.description || '',
    })
  }, [activeDetailIndex])
  // Form Front-End

  if (!isLoaded) return <Spinner />

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {Object.keys(sections).map((item) => (
          <div
            className={`${styles.section} ${
              activeSectionKey === item ? styles.active : ''
            }`}
            key={item}
            onClick={() => setActiveSectionKey(item)}
          >
            {sections[item]}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        <h4 style={{ textAllign: 'center' }}>{sectionTitle}</h4>
        <div className={styles.chips}>
          {activeInformation?.details
            ? activeInformation?.details?.map((item, index) => (
                <div
                  className={`${styles.chip} ${
                    activeDetailIndex === index ? styles.active : ''
                  }`}
                  key={item.title + index}
                  onClick={() => setActiveDetailIndex(index)}
                >
                  <p>
                    {sections[activeSectionKey]} {index + 1}
                  </p>
                  <X
                    onClick={(event) => {
                      event.stopPropagation()
                      handleDeleteDetail(index)
                    }}
                  />
                </div>
              ))
            : ''}
          {activeInformation?.details &&
          activeInformation?.details?.length > 0 ? (
            <div className={styles.new} onClick={handleAddNew}>
              +New
            </div>
          ) : (
            ''
          )}
        </div>
        {generateBody()}
        <p className={styles.red}>
          * Press <b>Save</b> before submitting the Form.{' '}
        </p>
        {sections[activeSectionKey] === 'Basic Info' ? (
          <p className={styles.red}>
            * Please fill information in other tabs also if you want to create
            CV.
          </p>
        ) : (
          ''
        )}
        <button onClick={handleSave}>Save</button>
        {sections[activeSectionKey] === 'Basic Info' ||
        sections[activeSectionKey] === 'Other' ? (
          <button className={styles.submit} onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default CV
