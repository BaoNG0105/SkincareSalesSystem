//package com.example.demo.entity;
//
//import jakarta.persistence.*;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "skin_tests")
//public class SkinTest {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "test_id")
//    private Long skinTestId;
//
//    @Column(name = "test_date", nullable = false)
//    private LocalDateTime testDate;
//
//    @Column(name = "IsDeleted", nullable = false)
//    private Boolean isDeleted = false;
//
//    // Quan hệ ManyToOne tới bảng users
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "customer_id", referencedColumnName = "user_id", nullable = false)
//    private User user;
//
//    // Quan hệ ManyToOne tới bảng skin_types
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "result_skin_type_id", referencedColumnName = "skin_type_id", nullable = false)
//    private SkinType resultSkinType;
//
//
//    // Getter and Setter
//
//    public Long getSkinTestId() {
//        return skinTestId;
//    }
//
//    public void setSkinTestId(Long skinTestId) {
//        this.skinTestId = skinTestId;
//    }
//
//    public LocalDateTime getTestDate() {
//        return testDate;
//    }
//
//    public void setTestDate(LocalDateTime testDate) {
//        this.testDate = testDate;
//    }
//
//    public Boolean getIsDeleted() {
//        return isDeleted;
//    }
//
//    public void setIsDeleted(Boolean deleted) {
//        isDeleted = deleted;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public SkinType getResultSkinType() {
//        return resultSkinType;
//    }
//
//    public void setResultSkinType(SkinType resultSkinType) {
//        this.resultSkinType = resultSkinType;
//    }
//}
