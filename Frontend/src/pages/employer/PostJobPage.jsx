import React, { useState, useRef } from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Card,
  Steps,
  Button,
  Input,
  Select,
  List,
  Typography,
  Divider,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  PlusOutlined,
  FileTextOutlined,
  BulbOutlined,
  StarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  TeamOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import styles from "../../styles/PostJobPage.module.css";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const PostJobPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [locations, setLocations] = useState([{ city: "", address: "" }]);
  const [completedSections, setCompletedSections] = useState([]);
  const sectionRefs = {
    title: useRef(null),
    industry: useRef(null),
    generalInfo: useRef(null),
    description: useRef(null),
    requirements: useRef(null),
    benefits: useRef(null),
    cvInfo: useRef(null),
  };

  const allSections = [
    "Tiêu đề tin tuyển dụng",
    "Ngành nghề và lĩnh vực",
    "Thông tin chung",
    "Nội dung tuyển dụng chi tiết",
    "Yêu cầu ứng viên",
    "Quyền lợi ứng viên",
    "Thông tin nhận CV",
  ];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      industry: "",
      position: "",
      jobType: "",
      level: "",
      experience: "",
      salaryType: "Thỏa thuận",
      salaryRange: { min: "", max: "" },
      description: "",
      requirements: "",
      benefits: "",
      deadline: "",
      skills: [],
    },
  });

  const salaryType = watch("salaryType");

  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }),
      Underline,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML());
      if (
        editor.getText().length > 0 &&
        !completedSections.includes("Nội dung tuyển dụng chi tiết")
      ) {
        setCompletedSections([
          ...completedSections,
          "Nội dung tuyển dụng chi tiết",
        ]);
      }
    },
  });

  const requirementsEditor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }),
      Underline,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("requirements", editor.getHTML());
      if (
        editor.getText().length > 0 &&
        !completedSections.includes("Yêu cầu ứng viên")
      ) {
        setCompletedSections([...completedSections, "Yêu cầu ứng viên"]);
      }
    },
  });

  const benefitsEditor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }),
      Underline,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("benefits", editor.getHTML());
      if (
        editor.getText().length > 0 &&
        !completedSections.includes("Quyền lợi ứng viên")
      ) {
        setCompletedSections([...completedSections, "Quyền lợi ứng viên"]);
      }
    },
  });

  const handleMenuClick = ({ key }) => {
    const section = sectionRefs[key].current;
    if (section) {
      const topOffset = 76;
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleLocationChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setLocations(newLocations);
    if (
      newLocations[index].city &&
      newLocations[index].address &&
      !completedSections.includes("Thông tin chung")
    ) {
      setCompletedSections([...completedSections, "Thông tin chung"]);
    }
  };

  const addLocation = () => {
    setLocations([...locations, { city: "", address: "" }]);
  };

  const onSubmit = (data) => {
    if (
      completedSections.length === allSections.length &&
      locations.every((loc) => loc.city && loc.address)
    ) {
      setCurrentStep(1);
      message.success("Đã hoàn thành bước 1, chuyển sang bước 2!");
    } else {
      message.warning("Vui lòng hoàn thành tất cả các mục trước khi tiếp tục!");
    }
  };

  const EditorToolbar = ({ editor }) => {
    if (!editor) return null;
    return (
      <div className={styles.editorToolbar}>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          type={editor.isActive("bold") ? "primary" : "default"}
        >
          B
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type={editor.isActive("italic") ? "primary" : "default"}
        >
          I
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          type={editor.isActive("underline") ? "primary" : "default"}
        >
          U
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type={editor.isActive("orderedList") ? "primary" : "default"}
        >
          1.
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type={editor.isActive("bulletList") ? "primary" : "default"}
        >
          •
        </Button>
      </div>
    );
  };

  return (
    <Layout className={styles.postJobLayout}>
      <Content className={styles.postJobContent}>
        <Row
          gutter={[16, 16]}
          style={{
            background: "#f8f9fa",
            padding: "16px 0",
            borderRadius: "24px",
            minHeight: "100vh",
          }}
        >
          <Col span={2} />
          <Col span={20}>
            {/* Thanh tiến trình */}
            <Card className={styles.stepsCard}>
              <Steps current={currentStep} className={styles.steps}>
                <Step title="Nội dung đăng tuyển" />
                <Step title="Hình thức hiển thị" />
                <Step title="Thiết lập quy trình" />
                <Step title="Đăng tin tuyển dụng" />
              </Steps>
            </Card>

            <Row gutter={[16, 16]}>
              {/* Cột 1: Menu điều hướng */}
              <Col xs={24} md={6} lg={6}>
                <div className={styles.stickyMenu}>
                  <Card className={styles.menuCard}>
                    <Menu
                      mode="vertical"
                      defaultSelectedKeys={["title"]}
                      onClick={handleMenuClick}
                      className={styles.navMenu}
                    >
                      <Menu.Item key="title" icon={<FileTextOutlined />}>
                        Tiêu đề tin tuyển dụng
                      </Menu.Item>
                      <Menu.Item key="industry" icon={<BulbOutlined />}>
                        Ngành nghề và lĩnh vực
                      </Menu.Item>
                      <Menu.Item key="generalInfo" icon={<StarOutlined />}>
                        Thông tin chung
                      </Menu.Item>
                      <Menu.Item key="description" icon={<FileTextOutlined />}>
                        Nội dung tuyển dụng chi tiết
                      </Menu.Item>
                      <Menu.Item key="requirements" icon={<TeamOutlined />}>
                        Yêu cầu ứng viên
                      </Menu.Item>
                      <Menu.Item key="benefits" icon={<StarOutlined />}>
                        Quyền lợi ứng viên
                      </Menu.Item>
                      <Menu.Item key="cvInfo" icon={<FileTextOutlined />}>
                        Thông tin nhận CV
                      </Menu.Item>
                    </Menu>
                  </Card>
                </div>
              </Col>

              {/* Cột 2: Nội dung chi tiết */}
              <Col xs={24} md={12} lg={13}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Tiêu đề tin tuyển dụng */}
                  <Card className={styles.contentCard} ref={sectionRefs.title}>
                    <Title level={3} className={styles.sectionTitle}>
                      Tiêu đề tin tuyển dụng
                    </Title>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Vui lòng nhập tiêu đề" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Nhập tiêu đề tin tuyển dụng"
                          size="large"
                          onChange={(e) => {
                            field.onChange(e);
                            if (
                              e.target.value &&
                              !completedSections.includes(
                                "Tiêu đề tin tuyển dụng"
                              )
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Tiêu đề tin tuyển dụng",
                              ]);
                            }
                          }}
                        />
                      )}
                    />
                    {errors.title && (
                      <Text type="danger">{errors.title.message}</Text>
                    )}
                  </Card>

                  {/* Ngành nghề và lĩnh vực */}
                  <Card
                    className={styles.contentCard}
                    ref={sectionRefs.industry}
                  >
                    <Title level={3} className={styles.sectionTitle}>
                      Ngành nghề và lĩnh vực
                    </Title>
                    <Controller
                      name="industry"
                      control={control}
                      rules={{ required: "Vui lòng chọn ngành nghề" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Chọn ngành nghề"
                          size="large"
                          style={{ width: "100%", marginBottom: 16 }}
                          onChange={(value) => {
                            field.onChange(value);
                            if (
                              value &&
                              !completedSections.includes(
                                "Ngành nghề và lĩnh vực"
                              )
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Ngành nghề và lĩnh vực",
                              ]);
                            }
                          }}
                        >
                          <Option value="Công nghệ thông tin">
                            Công nghệ thông tin
                          </Option>
                          <Option value="Marketing">Marketing</Option>
                          <Option value="Kinh doanh">Kinh doanh</Option>
                        </Select>
                      )}
                    />
                    {errors.industry && (
                      <Text type="danger">{errors.industry.message}</Text>
                    )}
                    <Controller
                      name="position"
                      control={control}
                      rules={{ required: "Vui lòng chọn vị trí tuyển dụng" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Chọn vị trí tuyển dụng"
                          size="large"
                          style={{ width: "100%" }}
                          onChange={(value) => {
                            field.onChange(value);
                            if (
                              value &&
                              !completedSections.includes(
                                "Ngành nghề và lĩnh vực"
                              )
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Ngành nghề và lĩnh vực",
                              ]);
                            }
                          }}
                        >
                          <Option value="Frontend Developer">
                            Frontend Developer
                          </Option>
                          <Option value="Backend Developer">
                            Backend Developer
                          </Option>
                          <Option value="Product Manager">
                            Product Manager
                          </Option>
                        </Select>
                      )}
                    />
                    {errors.position && (
                      <Text type="danger">{errors.position.message}</Text>
                    )}
                  </Card>

                  {/* Thông tin chung */}
                  <Card
                    className={styles.contentCard}
                    ref={sectionRefs.generalInfo}
                  >
                    <Title level={3} className={styles.sectionTitle}>
                      Thông tin chung
                    </Title>
                    <Controller
                      name="jobType"
                      control={control}
                      rules={{ required: "Vui lòng chọn loại công việc" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Chọn loại công việc"
                          size="large"
                          style={{ width: "100%", marginBottom: 16 }}
                          onChange={(value) => {
                            field.onChange(value);
                            if (
                              value &&
                              !completedSections.includes("Thông tin chung")
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Thông tin chung",
                              ]);
                            }
                          }}
                        >
                          <Option value="Full-time">Full-time</Option>
                          <Option value="Part-time">Part-time</Option>
                          <Option value="Remote">Remote</Option>
                        </Select>
                      )}
                    />
                    {errors.jobType && (
                      <Text type="danger">{errors.jobType.message}</Text>
                    )}
                    <Controller
                      name="level"
                      control={control}
                      rules={{ required: "Vui lòng chọn cấp bậc" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Chọn cấp bậc"
                          size="large"
                          style={{ width: "100%", marginBottom: 16 }}
                          onChange={(value) => {
                            field.onChange(value);
                            if (
                              value &&
                              !completedSections.includes("Thông tin chung")
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Thông tin chung",
                              ]);
                            }
                          }}
                        >
                          <Option value="Nhân viên">Nhân viên</Option>
                          <Option value="Trưởng nhóm">Trưởng nhóm</Option>
                          <Option value="Quản lý">Quản lý</Option>
                        </Select>
                      )}
                    />
                    {errors.level && (
                      <Text type="danger">{errors.level.message}</Text>
                    )}
                    <Controller
                      name="experience"
                      control={control}
                      rules={{ required: "Vui lòng chọn kinh nghiệm" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Chọn kinh nghiệm"
                          size="large"
                          style={{ width: "100%", marginBottom: 16 }}
                          onChange={(value) => {
                            field.onChange(value);
                            if (
                              value &&
                              !completedSections.includes("Thông tin chung")
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Thông tin chung",
                              ]);
                            }
                          }}
                        >
                          <Option value="Không yêu cầu">Không yêu cầu</Option>
                          <Option value="1-2 năm">1-2 năm</Option>
                          <Option value="3-5 năm">3-5 năm</Option>
                        </Select>
                      )}
                    />
                    {errors.experience && (
                      <Text type="danger">{errors.experience.message}</Text>
                    )}
                    <Controller
                      name="salaryType"
                      control={control}
                      rules={{ required: "Vui lòng chọn kiểu lương" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder="Chọn kiểu lương"
                          size="large"
                          style={{ width: "100%", marginBottom: 16 }}
                          onChange={(value) => {
                            field.onChange(value);
                            if (
                              value &&
                              !completedSections.includes("Thông tin chung")
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Thông tin chung",
                              ]);
                            }
                          }}
                        >
                          <Option value="Thỏa thuận">Thỏa thuận</Option>
                          <Option value="Khoảng lương">Khoảng lương</Option>
                        </Select>
                      )}
                    />
                    {errors.salaryType && (
                      <Text type="danger">{errors.salaryType.message}</Text>
                    )}
                    {salaryType === "Khoảng lương" && (
                      <div className={styles.salaryRange}>
                        <Controller
                          name="salaryRange.min"
                          control={control}
                          rules={{ required: "Vui lòng nhập lương tối thiểu" }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Lương tối thiểu (triệu)"
                              size="large"
                              style={{ width: "48%", marginRight: "4%" }}
                              onChange={(e) => {
                                field.onChange(e);
                                if (
                                  e.target.value &&
                                  !completedSections.includes("Thông tin chung")
                                ) {
                                  setCompletedSections([
                                    ...completedSections,
                                    "Thông tin chung",
                                  ]);
                                }
                              }}
                            />
                          )}
                        />
                        {errors.salaryRange?.min && (
                          <Text type="danger">
                            {errors.salaryRange.min.message}
                          </Text>
                        )}
                        <Controller
                          name="salaryRange.max"
                          control={control}
                          rules={{ required: "Vui lòng nhập lương tối đa" }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Lương tối đa (triệu)"
                              size="large"
                              style={{ width: "48%" }}
                              onChange={(e) => {
                                field.onChange(e);
                                if (
                                  e.target.value &&
                                  !completedSections.includes("Thông tin chung")
                                ) {
                                  setCompletedSections([
                                    ...completedSections,
                                    "Thông tin chung",
                                  ]);
                                }
                              }}
                            />
                          )}
                        />
                        {errors.salaryRange?.max && (
                          <Text type="danger">
                            {errors.salaryRange.max.message}
                          </Text>
                        )}
                      </div>
                    )}
                    {locations.map((location, index) => (
                      <div key={index} className={styles.locationItem}>
                        <Select
                          placeholder="Chọn tỉnh/thành phố"
                          value={location.city}
                          onChange={(value) =>
                            handleLocationChange(index, "city", value)
                          }
                          size="large"
                          style={{ width: "100%", marginBottom: 16 }}
                        >
                          <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
                          <Option value="Hà Nội">Hà Nội</Option>
                          <Option value="Đà Nẵng">Đà Nẵng</Option>
                        </Select>
                        <Input
                          placeholder="Địa chỉ cụ thể"
                          value={location.address}
                          onChange={(e) =>
                            handleLocationChange(
                              index,
                              "address",
                              e.target.value
                            )
                          }
                          size="large"
                          style={{ marginBottom: 16 }}
                        />
                      </div>
                    ))}
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={addLocation}
                    >
                      Thêm khu vực
                    </Button>
                  </Card>

                  {/* Nội dung tuyển dụng chi tiết */}
                  <Card
                    className={styles.contentCard}
                    ref={sectionRefs.description}
                  >
                    <Title level={3} className={styles.sectionTitle}>
                      Nội dung tuyển dụng chi tiết
                    </Title>
                    <EditorToolbar editor={descriptionEditor} />
                    <EditorContent
                      editor={descriptionEditor}
                      className={styles.tiptapEditor}
                    />
                    {errors.description && (
                      <Text type="danger">{errors.description.message}</Text>
                    )}
                  </Card>

                  {/* Yêu cầu ứng viên */}
                  <Card
                    className={styles.contentCard}
                    ref={sectionRefs.requirements}
                  >
                    <Title level={3} className={styles.sectionTitle}>
                      Yêu cầu ứng viên
                    </Title>
                    <EditorToolbar editor={requirementsEditor} />
                    <EditorContent
                      editor={requirementsEditor}
                      className={styles.tiptapEditor}
                    />
                    {errors.requirements && (
                      <Text type="danger">{errors.requirements.message}</Text>
                    )}
                    <Controller
                      name="skills"
                      control={control}
                      rules={{ required: "Vui lòng chọn ít nhất một kỹ năng" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          mode="tags"
                          placeholder="Chọn kỹ năng liên quan"
                          size="large"
                          style={{ width: "100%", marginTop: 16 }}
                          onChange={(value) => {
                            field.onChange(value);
                            if (
                              value.length > 0 &&
                              !completedSections.includes("Yêu cầu ứng viên")
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Yêu cầu ứng viên",
                              ]);
                            }
                          }}
                        >
                          <Option value="React">React</Option>
                          <Option value="Node.js">Node.js</Option>
                          <Option value="Python">Python</Option>
                        </Select>
                      )}
                    />
                    {errors.skills && (
                      <Text type="danger">{errors.skills.message}</Text>
                    )}
                  </Card>

                  {/* Quyền lợi ứng viên */}
                  <Card
                    className={styles.contentCard}
                    ref={sectionRefs.benefits}
                  >
                    <Title level={3} className={styles.sectionTitle}>
                      Quyền lợi ứng viên
                    </Title>
                    <EditorToolbar editor={benefitsEditor} />
                    <EditorContent
                      editor={benefitsEditor}
                      className={styles.tiptapEditor}
                    />
                    {errors.benefits && (
                      <Text type="danger">{errors.benefits.message}</Text>
                    )}
                  </Card>

                  {/* Thông tin nhận CV */}
                  <Card className={styles.contentCard} ref={sectionRefs.cvInfo}>
                    <Title level={3} className={styles.sectionTitle}>
                      Thông tin nhận CV
                    </Title>
                    <Controller
                      name="deadline"
                      control={control}
                      rules={{ required: "Vui lòng nhập hạn chót nhận hồ sơ" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Hạn chót nhận hồ sơ (dd/mm/yyyy)"
                          size="large"
                          onChange={(e) => {
                            field.onChange(e);
                            if (
                              e.target.value &&
                              !completedSections.includes("Thông tin nhận CV")
                            ) {
                              setCompletedSections([
                                ...completedSections,
                                "Thông tin nhận CV",
                              ]);
                            }
                          }}
                        />
                      )}
                    />
                    {errors.deadline && (
                      <Text type="danger">{errors.deadline.message}</Text>
                    )}
                  </Card>
                </form>
              </Col>

              {/* Cột 3: Hoàn thành thông tin */}
              <Col xs={24} md={6} lg={5}>
                <div className={styles.stickyMenu}>
                  <Card className={styles.sidebarCard}>
                    <List
                      header={
                        <Text strong>
                          Đã hoàn thành: {completedSections.length}/
                          {allSections.length} (
                          {Math.round(
                            (completedSections.length / allSections.length) *
                              100
                          )}
                          %)
                        </Text>
                      }
                      dataSource={allSections}
                      locale={{ emptyText: <br /> }}
                      renderItem={(item) => (
                        <List.Item>
                          {completedSections.includes(item) ? (
                            <CheckCircleOutlined
                              className={styles.completedIcon}
                            />
                          ) : (
                            <CloseCircleOutlined
                              className={styles.incompleteIcon}
                            />
                          )}{" "}
                          {item}
                        </List.Item>
                      )}
                    />
                    <Divider style={{ margin: "0 0 10px" }} />
                    <Button
                      type="primary"
                      block
                      onClick={handleSubmit(onSubmit)}
                    >
                      Lưu và tiếp tục
                    </Button>
                  </Card>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={2} />
        </Row>
      </Content>
    </Layout>
  );
};

export default PostJobPage;
