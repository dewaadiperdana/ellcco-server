class Text {
  static formatStatusLabelCapitalize(text) {
    const status = text.split('_');
    const labels = status.map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });

    return labels.join(' ');
  }
}

export default Text;
