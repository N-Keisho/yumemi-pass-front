describe("Navigation", () => {
  it("should navigate to the about page", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("北海道").click();
    cy.contains("年少人口").click();
    cy.contains("生産年齢人口").click();
    cy.contains("老年人口").click();
    cy.contains("北海道").click();
    cy.contains("全選択").click();
  });
});
